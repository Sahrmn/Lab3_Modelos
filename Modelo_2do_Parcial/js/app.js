var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Clases;
(function (Clases) {
    var Animal = /** @class */ (function () {
        function Animal(nom, edad, patas) {
            this.nombre = nom;
            this.edad = edad;
            this.patas = patas;
        }
        Animal.prototype.toJSON = function () {
            var json = "{\"nombre\":\"" + this.nombre + "\", \"edad\":" + this.edad + ",\"patas\":" + this.patas + "}";
            return json;
        };
        return Animal;
    }());
    Clases.Animal = Animal;
})(Clases || (Clases = {}));
///<reference path="animal.ts"/>
var Clases;
(function (Clases) {
    var Mascota = /** @class */ (function (_super) {
        __extends(Mascota, _super);
        function Mascota(id, nombre, edad, patas, tipo) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.id = id;
            _this.tipo = tipo;
            return _this;
        }
        Mascota.prototype.toJSON = function () {
            var json = "{\"id\":" + this.id + ", \"nombre\":\"" + this.nombre + "\", \"edad\":" + this.edad + ",\"patas\":" + this.patas + ", \"tipo\":" + this.tipo + "}";
            return json;
        };
        return Mascota;
    }(Clases.Animal));
    Clases.Mascota = Mascota;
})(Clases || (Clases = {}));
var Clases;
(function (Clases) {
    var tipoMascota;
    (function (tipoMascota) {
        tipoMascota[tipoMascota["Perro"] = 0] = "Perro";
        tipoMascota[tipoMascota["Gato"] = 1] = "Gato";
        tipoMascota[tipoMascota["Reptil"] = 2] = "Reptil";
        tipoMascota[tipoMascota["Roedor"] = 3] = "Roedor";
        tipoMascota[tipoMascota["Ave"] = 4] = "Ave";
        tipoMascota[tipoMascota["Pez"] = 5] = "Pez";
    })(tipoMascota = Clases.tipoMascota || (Clases.tipoMascota = {}));
})(Clases || (Clases = {}));
//tsc --outFile app.js app enumerados animal mascota
///<reference path="mascota.ts"/>
///<reference path="enumerados.ts"/>
$(document).ready(function () {
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
        var f = Number($('#cmbFiltro').val());
        filtrarMascotas(f);
    });
    $('#chkId').change(mapearCampos);
    $('#chkName').change(mapearCampos);
    $('#chkEdad').change(mapearCampos);
    $('#chkPatas').change(mapearCampos);
    //mapearCampos();
});
function agregarEventosTabla() {
    var td = document.getElementsByTagName('td');
    for (var i = 0; i < td.length; i++) {
        td[i].addEventListener('click', cargarFormulario);
    }
}
function cargarFormulario(e) {
    var element = e.target;
    var padre = element.parentElement;
    var hijo = padre.firstChild;
    var id = hijo.textContent;
    var hijo2 = hijo.nextElementSibling;
    var nombre = hijo2.textContent;
    hijo = hijo2.nextElementSibling;
    var edad = hijo.textContent;
    hijo2 = hijo.nextElementSibling;
    var tipo = hijo2.textContent;
    hijo = hijo2.nextElementSibling;
    var patas = hijo.textContent;
    $('#txtId').val(String(id));
    $('#txtNombre').val(String(nombre));
    $('#txtEdad').val(String(edad));
    $('#txtPatas').val(patas);
    $('#selectTipo').val(Clases.tipoMascota[tipo]);
}
function agregarMascota(e) {
    e.preventDefault();
    if (validar()) {
        var id = Number($('#txtId').val());
        var num = Number($('#selectTipo :selected').val());
        var tipo = void 0;
        switch (num) {
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
        var nuevaMascota = new Clases.Mascota(id, String($('#txtNombre').val()), Number($('#txtEdad').val()), Number($('#txtPatas').val()), tipo);
        var MascotasString = localStorage.getItem("Mascotas");
        var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
        var flag = true;
        var MasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
        for (var i in MasJSON) {
            if (MasJSON[i].id == id) {
                alert("El id ya existe!");
                flag = false;
                break;
            }
        }
        if (flag) {
            console.log(nuevaMascota.toJSON());
            MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));
            localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));
            alert("Mascota guardada!!!");
            mostrarMascotas();
            limpiarCampos();
        }
        //console.log(nuevaMascota.toJSON());
    }
    else {
        alert("Faltan completar campos!");
    }
}
function validar() {
    var id = Number($('#txtId').val());
    var nombre = String($('#txtNombre').val());
    var edad = Number($('#txtEdad').val());
    var patas = Number($('#txtPatas').val());
    var flag = true;
    if (id == 0 || nombre == "" || edad == 0 || patas == 0) {
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
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    var tabla = "<table class='table table-hover bg-light'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr></thead>";
    var tipo;
    for (var i = 0; i < MascotasJSON.length; i++) {
        tabla += "<tr><td>" + MascotasJSON[i].id + "</td><td>" + MascotasJSON[i].nombre + "</td><td>" + MascotasJSON[i].edad + "</td><td>" + Clases.tipoMascota[MascotasJSON[i].tipo] + "</td><td>" + MascotasJSON[i].patas + "</td></tr>";
        //console.log(Clases.tipoMascota[MascotasJSON[i].tipo]);
    }
    //console.log(MascotasJSON);
    tabla += "</table>";
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
    for (var i = 0; i < 5; i++) {
        $("#cmbFiltro").append('<option value="' + i + '">' + Clases.tipoMascota[i] + '</option>');
    }
    $.each(Clases.tipoMascota, function (value, tipo) {
        /* $("#cmbFiltro").append('<option value="'+value+'">'+tipo+'</option>');
             //console.log(x);
             i++;
             */
    });
}
function filtrarMascotas(tipo) {
    //console.log(tipo);
    var mascotasFiltradas;
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    mascotasFiltradas = MascotasJSON
        .filter(function (mascota) {
        return Clases.tipoMascota[mascota.tipo] === Clases.tipoMascota[tipo];
    });
    //console.log(mascotasFiltradas);
    mostrarMascotasPorTipo(mascotasFiltradas);
}
function cleanStorage() {
    localStorage.clear();
    mostrarMascotas();
    alert("LocalStorage Limpio");
}
function mostrarMascotasPorTipo(lista) {
    var tabla = "<table class='table table-hover bg-light'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr></thead>";
    if (lista.length == 0) {
        tabla += "<tr><td colspan='4'>No hay mascotas que mostrar</td></tr>";
    }
    else {
        for (var i = 0; i < lista.length; i++) {
            tabla += "<tr><td>" + lista[i].id + "</td><td>" + lista[i].nombre + "</td><td>" + lista[i].edad + "</td><td>" + Clases.tipoMascota[lista[i].tipo] + "</td><td>" + lista[i].patas + "</td></tr>";
        }
    }
    tabla += "</table>";
    $('#divTabla').html(tabla);
}
function calcularPromedio() {
    var promedio = 0;
    var totalEdades;
    var cantidad;
    var tipo = Number($('#cmbFiltro').val());
    var mascotasFiltradas;
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    mascotasFiltradas = MascotasJSON.filter(function (mascota) {
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
    var chkId = $('#chkId')[0].checked;
    var chkName = $('#chkName')[0].checked;
    var chkEdad = $('#chkEdad')[0].checked;
    var chkPatas = $('#chkPatas')[0].checked;
    //console.log(chkId);
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    var tabla = "<table class='table table-hover bg-light'><thead><tr>";
    if (chkId)
        tabla += "<th>Id</th>";
    if (chkName)
        tabla += "<th>Nombre</th>";
    if (chkEdad)
        tabla += "<th>Edad</th>";
    tabla += "<th>Tipo</th>";
    if (chkPatas)
        tabla += "<th>Patas</th>";
    tabla += "</tr></thead>";
    for (var i = 0; i < MascotasJSON.length; i++) {
        tabla += "<tr>";
        if (chkId)
            tabla += "<td>" + MascotasJSON[i].id + "</td>";
        if (chkName)
            tabla += "<td>" + MascotasJSON[i].nombre + "</td>";
        if (chkEdad)
            tabla += "<td>" + MascotasJSON[i].edad + "</td>";
        tabla += "<td>" + Clases.tipoMascota[MascotasJSON[i].tipo] + "</td>";
        if (chkPatas)
            tabla += "<td>" + MascotasJSON[i].patas + "</td>";
        tabla += "</tr>";
    }
    tabla += "</table>";
    $('#divTabla').html(tabla);
}
function modificarMascota() {
    var id = Number($('#txtId').val());
    var nombre = String($('#txtNombre').val());
    var patas = Number($('#txtPatas').val());
    var edad = Number($('#txtEdad').val());
    var num = Number($('#selectTipo :selected').val());
    var tipo;
    switch (num) {
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
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    console.log(MascotasJSON);
    for (var i in MascotasJSON) {
        if (MascotasJSON[i].id == id) {
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
function eliminarMascota() {
    var id = Number($('#txtId').val());
    var MascotasString = localStorage.getItem("Mascotas");
    var MascotasJSON = MascotasString == null ? [] : JSON.parse(MascotasString);
    var NuevoMascotas = [];
    for (var i in MascotasJSON) {
        //console.log(MascotasJSON[i].id);
        if (MascotasJSON[i].id != id) {
            var msc = new Clases.Mascota(MascotasJSON[i].id, MascotasJSON[i].nombre, MascotasJSON[i].edad, MascotasJSON[i].patas, MascotasJSON[i].tipo);
            var n = NuevoMascotas.push(JSON.parse(msc.toJSON()));
            //console.log(NuevoMascotas);
        }
    }
    console.log(NuevoMascotas);
    localStorage.setItem("Mascotas", JSON.stringify(NuevoMascotas));
    mostrarMascotas();
    limpiarCampos();
    alert("Mascota eliminada");
}
