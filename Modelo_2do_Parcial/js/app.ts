//tsc --outFile app.js app enumerados animal mascota


///<reference path="mascota.ts"/>
///<reference path="enumerados.ts"/>

$(document).ready(function() {
	// localStorage.clear();
	cargarTipos();
	mostrarMascotas();

	//$('#btnAgregar').click(agregarMascota);
	$('#formMascota').submit(agregarMascota);
	$('#btnModificar').click(modificarMascota);
	$('#btnEliminar').click(eliminarMascota);
	
	$('#btnClearStorage').click(cleanStorage);

	agregarEventosTabla();

	$('#cmbFiltro').change(function () {
		let f = Number($('#cmbFiltro').val());
		filtrarMascotas(f);
	});


	$('#chkId').change(mapearCampos);
	$('#chkName').change(mapearCampos);
	$('#chkEdad').change(mapearCampos);
	$('#chkPatas').change(mapearCampos);    

	//mapearCampos();


});

function agregarEventosTabla()
{
	let td = document.getElementsByTagName('td');
	for(let i = 0; i < td.length; i++)
	{
		td[i].addEventListener('click', cargarFormulario);
	}
}

function cargarFormulario(e)
{
	let element = e.target;
	let padre = element.parentElement;
	let hijo = padre.firstChild;

	let id:number = hijo.textContent;

	let hijo2 = hijo.nextElementSibling;
	let nombre:string = hijo2.textContent;

	hijo = hijo2.nextElementSibling;
	let edad:number = hijo.textContent;

	hijo2 = hijo.nextElementSibling;
	let tipo:Clases.tipoMascota = hijo2.textContent;

	hijo = hijo2.nextElementSibling;
	let patas:number = hijo.textContent;
	
	$('#txtId').val(String(id));
	$('#txtNombre').val(String(nombre));
	$('#txtEdad').val(String(edad));
	$('#txtPatas').val(patas);
	$('#selectTipo').val(Clases.tipoMascota[tipo]);	

}

function agregarMascota(e:any):void {
	e.preventDefault();
	if(validar())
	{

		let id:number = Number($('#txtId').val());

		let num:number = Number($('#selectTipo :selected').val());
		let tipo:Clases.tipoMascota;
		switch(num)
		{
			case 0:
				tipo = Clases.tipoMascota.Perro;
				break;
			case 1:
				tipo = Clases.tipoMascota.Gato;
				break;
			case 2:
				tipo = Clases.tipoMascota.Reptil;
				break;
			case 3:
				tipo = Clases.tipoMascota.Roedor;
				break;
			case 4:
				tipo = Clases.tipoMascota.Ave;
				break;
			case 5:
				tipo = Clases.tipoMascota.Pez;
				break;
		}
		//console.log(tipo);
		//let tipo:Clases.tipoMascota = Number($('#selectTipo :selected').val());
		//console.log(Number($('#selectTipo :selected').val()));

		let nuevaMascota = new Clases.Mascota(id, String($('#txtNombre').val()), Number($('#txtEdad').val()), Number($('#txtPatas').val()), tipo);

		let MascotasString: string | null = localStorage.getItem("Mascotas");

		let MascotasJSON: JSON[] = MascotasString == null ? [] : JSON.parse(MascotasString);

		let flag:boolean = true;
		let MasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);
		for(let i in MasJSON)
		{
			if(MasJSON[i].id == id)
			{
				alert("El id ya existe!");
				flag = false;
				break;
			}
		}

		if(flag)
		{

			console.log(nuevaMascota.toJSON());

			MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));

			localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));

			alert("Mascota guardada!!!");
			mostrarMascotas();

			limpiarCampos();

		}
		
		//console.log(nuevaMascota.toJSON());
	}
	else
	{
		alert("Faltan completar campos!");
	}

}

function validar():boolean
{
	let id = Number($('#txtId').val());
	let nombre = String($('#txtNombre').val());
	let edad = Number($('#txtEdad').val());
	let patas = Number($('#txtPatas').val())
	let flag = true;
	if(id == 0 || nombre == "" || edad == 0 || patas == 0)
	{
		flag = false;
	}
	//console.log(flag);

	return flag;
}

function limpiarCampos() {
	$('#txtNombre').val("");
	$('#txtId').val("");
	$('#txtEdad').val("");
	$('#txtPatas').val("");
	$('#selectTipo').val(0);

	$('#txtId').focus();
}

function mostrarMascotas() {

	let MascotasString: string | null = localStorage.getItem("Mascotas");

	let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

	let tabla: string = "<table class='table table-hover bg-light'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr></thead>";
	let tipo:string;

	for (let i = 0; i < MascotasJSON.length; i++) {

		tabla += `<tr><td>${MascotasJSON[i].id}</td><td>${MascotasJSON[i].nombre}</td><td>${MascotasJSON[i].edad}</td><td>${Clases.tipoMascota[MascotasJSON[i].tipo]}</td><td>${MascotasJSON[i].patas}</td></tr>`;
		//console.log(Clases.tipoMascota[MascotasJSON[i].tipo]);
	}
		//console.log(MascotasJSON);

	tabla += `</table>`;

	$('#divTabla').html(tabla);

}

function cargarTipos() {
/*
	var tipos = data.map(function(p){
		 return p.pais;
	 })
	 .unique()
	 .sort();
*/ 
	for (let i = 0; i < 5; i++) {
		$("#cmbFiltro").append('<option value="' + i + '">' + Clases.tipoMascota[i] + '</option>');
	}


	$.each(Clases.tipoMascota, function (value, tipo) {
		/* $("#cmbFiltro").append('<option value="'+value+'">'+tipo+'</option>');
			 //console.log(x);
			 i++;
			 */

	});
}

function filtrarMascotas(tipo: number) {
	//console.log(tipo);

	let mascotasFiltradas: Array<Clases.Mascota>;

	let MascotasString: string | null = localStorage.getItem("Mascotas");

	let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

	mascotasFiltradas = MascotasJSON
		.filter(function (mascota:Clases.Mascota) {

		return Clases.tipoMascota[mascota.tipo] === Clases.tipoMascota[tipo];

		}
	);
	//console.log(mascotasFiltradas);
	mostrarMascotasPorTipo(mascotasFiltradas);

}

function cleanStorage() {
	localStorage.clear();
	mostrarMascotas();
	alert("LocalStorage Limpio");
}

function mostrarMascotasPorTipo(lista: Array<Clases.Mascota>) {


	let tabla: string = "<table class='table table-hover bg-light'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr></thead>";

	if (lista.length == 0) {
		tabla += "<tr><td colspan='4'>No hay mascotas que mostrar</td></tr>";
	}
	else {

		for (let i = 0; i < lista.length; i++) {

			tabla += `<tr><td>${lista[i].id}</td><td>${lista[i].nombre}</td><td>${lista[i].edad}</td><td>${Clases.tipoMascota[lista[i].tipo]}</td><td>${lista[i].patas}</td></tr>`;
		}
	}

	tabla += `</table>`;

	$('#divTabla').html(tabla);

}

function calcularPromedio() {

	let promedio: number = 0;
	let totalEdades: number;
	let cantidad: number;

	let tipo: number = Number($('#cmbFiltro').val());



	let mascotasFiltradas: Array<Clases.Mascota>;

	let MascotasString: string | null = localStorage.getItem("Mascotas");

	let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

	mascotasFiltradas = MascotasJSON.filter(function (mascota: Clases.Mascota) {

		return Clases.tipoMascota[mascota.tipo] === Clases.tipoMascota[tipo];

	});

	totalEdades = mascotasFiltradas.reduce(function (anterior, actual) {
		return anterior += actual.edad;

	}, 0);


	console.log(totalEdades);

	cantidad = mascotasFiltradas.length;


	console.log(cantidad);

	if (cantidad != 0) {
		promedio = totalEdades / cantidad;
	}

	$('#txtPromedio').val(promedio);

}

function mapearCampos() {

		let chkId: boolean = (<HTMLInputElement> $('#chkId')[0]).checked;
		let chkName: boolean = (<HTMLInputElement> $('#chkName')[0]).checked;
		let chkEdad: boolean = (<HTMLInputElement> $('#chkEdad')[0]).checked;
		let chkPatas: boolean = (<HTMLInputElement> $('#chkPatas')[0]).checked;

		//console.log(chkId);
		
	
		let MascotasString: string | null = localStorage.getItem("Mascotas");
	
		let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);
	
		let tabla: string = "<table class='table table-hover bg-light'><thead><tr>";

		if(chkId)
		tabla += "<th>Id</th>";
		if(chkName)
		tabla += "<th>Nombre</th>";
		if(chkEdad)
		tabla+= "<th>Edad</th>";
		tabla += "<th>Tipo</th>";
		if(chkPatas)
		tabla += "<th>Patas</th>";
		tabla += "</tr></thead>";   
	
		for (let i = 0; i < MascotasJSON.length; i++) {
	
			tabla += `<tr>`;
			if(chkId)
			tabla += `<td>${MascotasJSON[i].id}</td>`;
			if(chkName)
			tabla += `<td>${MascotasJSON[i].nombre}</td>`;
			if(chkEdad)
			tabla+= `<td>${MascotasJSON[i].edad}</td>`;
			tabla += `<td>${Clases.tipoMascota[MascotasJSON[i].tipo]}</td>`;
			if(chkPatas)
			tabla += `<td>${MascotasJSON[i].patas}</td>`;
			tabla += `</tr>`;             
	
		}
	
		tabla += `</table>`;
	
		$('#divTabla').html(tabla);
	
	}
	
function modificarMascota()
{
	let id:number = Number($('#txtId').val());
	let nombre:string = String($('#txtNombre').val());
	let patas:number = Number($('#txtPatas').val());
	let edad:number = Number($('#txtEdad').val());

	let num:number = Number($('#selectTipo :selected').val());
	let tipo:Clases.tipoMascota;
	switch(num)
	{
		case 0:
			tipo = Clases.tipoMascota.Perro;
			break;
		case 1:
			tipo = Clases.tipoMascota.Gato;
			break;
		case 2:
			tipo = Clases.tipoMascota.Reptil;
			break;
		case 3:
			tipo = Clases.tipoMascota.Roedor;
			break;
		case 4:
			tipo = Clases.tipoMascota.Ave;
			break;
		case 5:
			tipo = Clases.tipoMascota.Pez;
			break;
	}

	let MascotasString: string | null = localStorage.getItem("Mascotas");
	let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);
	console.log(MascotasJSON);
	for(let i in MascotasJSON)
	{
		if(MascotasJSON[i].id == id)
		{
			MascotasJSON[i].nombre = nombre;
			MascotasJSON[i].patas = patas;
			MascotasJSON[i].edad = edad;
			MascotasJSON[i].tipo = tipo;
			//console.log(MascotasJSON[i]);
		}
	}
	localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));
	//recargar listado
	mostrarMascotas();
	alert("Mascota Modificada!");
}

function eliminarMascota()
{
	let id:number = Number($('#txtId').val());

	let MascotasString: string | null = localStorage.getItem("Mascotas");
	let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);
	let NuevoMascotas:JSON[] = [];

	for(let i in MascotasJSON)
	{
		//console.log(MascotasJSON[i].id);

		if(MascotasJSON[i].id != id)
		{
			let msc:Clases.Mascota = new Clases.Mascota(MascotasJSON[i].id, MascotasJSON[i].nombre, MascotasJSON[i].edad, MascotasJSON[i].patas, MascotasJSON[i].tipo);
			let n = NuevoMascotas.push(JSON.parse(msc.toJSON()));
			//console.log(NuevoMascotas);
		}
	}

	console.log(NuevoMascotas);
	localStorage.setItem("Mascotas", JSON.stringify(NuevoMascotas));
	mostrarMascotas();
	limpiarCampos();
	alert("Mascota eliminada");

}