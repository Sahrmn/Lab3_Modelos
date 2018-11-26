$(document).ready(inicializarEventos);

function inicializarEventos(){
    
    $("#btnAlta").click(altaPersonaje);
    traerListaHeroes();
    //$("#tabla").click(mostrarFormulario);
    //agregarEventosElemTabla();
    
}

function Heroe(id, nombre, apellido, alias, edad, lado) {
    this.id = id,
    this.nombre = nombre,
    this.apellido = apellido,
    this.alias = alias,
    this.edad= edad,
    this.lado = lado //verificar el lado que recibe con los radio button
};

function traerListaHeroes()
{
    var parametro = {
        "collection": "heroes"
    };
    $.ajax({
        url: "http://localhost:3000/traer",
        data: parametro,
        beforeSend: function(){
            $('#tabla').html('<img class="img-center" src="./images/ajax-loader.gif">');
        },
        success: function(respuesta){

            $("#tabla").html(actualizarTabla(respuesta.data));
            agregarEventosElemTabla();
            console.log("Insercion de tabla: " + respuesta.message);
        },
        error: function(xhr, status){
            alert("Error " + xhr.status + " " + xhr.statusText);
        },
    });
}
/* lo mismo que traer heroes
$(document).ready(function(){
    $.get("http://localhost:3000/traer", { coleccion: "heroes"}, manejarRespuesta);
});

function manejarRespuesta(datos)
{
    alert("respuesta obtenida");
}*/

function altaPersonaje(e)
{
    e.preventDefault();

    var id = $("#id").val();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var alias = $("#alias").val();
    var lado = $('input:radio[name=lado]:checked').val(); //para obtener el valor seleccionado en un radio button
    var edad = $("#edad").val();

    //console.log(lado); 

    var heroe = new Heroe(id, nombre, apellido, alias, edad, lado);

    var parametros = {
        "collection": "heroes",
        "heroe": heroe
    };
    
    //console.log(heroe); 

    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/agregar",
        data: JSON.stringify(parametros),
        beforeSend: function(){
            $('#tabla').html('<img src="./images/ajax-loader.gif">');
        },
        contentType: 'application/json',
        //dataType: 'json',
        success: function(respuesta){
            console.log("Alta de personaje: " + respuesta.message);
            // recargo la lista de personajes
            traerListaHeroes();
            //cierro el formulario
            $("#formulario").hide();
            limpiarFormulario();
            alert(respuesta.message);
        },
        error: function(xhr, status){
            alert("Error " + xhr.status + " " + xhr.statusText);
        },
    });   
    /*
    $.post("http://localhost:3000/agregar", parametros, function(resp){
        alert(resp.message);
    });*/
}

function eliminarPersonaje(e)
{
    e.preventDefault();
    //poner ventana de confirmacion

    var id = document.getElementById('id').value;
    
    var heroe = new Heroe();
    heroe.id = id;
    eliminarHeroe(heroe);
}

function modificarPersonaje(e)
{
    e.preventDefault();

    var id = $("#id").val();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var alias = $("#alias").val();
    var lado = $('input:radio[name=lado]:checked').val();
    var edad = $("#edad").val();

    var heroe = new Heroe(id, nombre, apellido, alias, edad, lado);

    modificarHeroe(heroe);

}

function insertarHeroe(heroe)
{

}

function eliminarHeroe(heroe)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        document.getElementById('tabla').innerHTML = '<img src="./images/ajax-loader.gif">';
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText.message);
            $("#formulario").hide();
            limpiarFormulario();
            traerListaHeroes();
            alert("Baja realizada");
        }
    }

    var data = {
        "collection":"heroes",
        "id": heroe.id
    }
    data = JSON.stringify(data);

    xhr.open('POST', 'http://localhost:3000/eliminar', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function modificarHeroe(heroe)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        document.getElementById('tabla').innerHTML = '<img src="./images/ajax-loader.gif">';
        if(this.readyState == 4 && this.status == 200)
        {
            console.log(this.responseText.message);
            $("#formulario").hide();
            limpiarFormulario();
            traerListaHeroes();
            alert("Modificacion realizada");
        }
    }

    var data = {
        "collection":"heroes",
        "heroe": heroe
    }
    data = JSON.stringify(data);
    //console.log(data);
    xhr.open('POST', 'http://localhost:3000/modificar', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function agregarEventosElemTabla()
{
    for (var i = 0; i < document.getElementsByTagName('td').length; i++) {
        document.getElementsByTagName('td')[i].addEventListener('click', mostrarFormularioHeroe);
        document.getElementsByTagName('td')[i].addEventListener('mouseover', resaltar);
        document.getElementsByTagName('td')[i].addEventListener('mouseout', quitarResaltar);
    }
    document.getElementById('btnEliminar').addEventListener('click', eliminarPersonaje);
    document.getElementById('btnModificar').addEventListener('click', modificarPersonaje);
    
}



