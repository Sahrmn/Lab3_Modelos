window.addEventListener('load', manejadores);

$(document).ready(function(){
    
    $("#btnAgregar").click(mostrarFormulario);
    $("#btnCancelar").click(cerrarFormulario);
    
});

function manejadores()
{
    $("#formulario").hide();
    $('#btnModificar').hide();
    $('#btnEliminar').hide();
}

function actualizarTabla(lista)
{
    if(lista != null)
    {
        retorno = "<table><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Alias</th><th>Edad</th><th>Lado</th></tr>";
        lista.forEach(function(element){
            retorno = retorno + "<tr><td>" + element.id + "</td><td>" + element.nombre + "</td><td>" + element.apellido + "</td><td>" + element.alias + "</td><td>" + element.edad + "</td><td>" + element.lado + "</td></tr>";
        });

        retorno = retorno + "</table>";
        return retorno;
    }
}

function mostrarFormulario()
{
    $('#btnModificar').hide();
    $('#btnEliminar').hide();
    $('#btnAlta').show();

    $("#formulario").show("slow");
    $("#formulario").slideDown();
}

function mostrarFormularioHeroe(e)
{
    //alert("hola!");
    var elemento = e.target;

    var padre = elemento.parentElement;

    var heroe = new Heroe();

    var hijo = padre.firstChild;
    heroe.id = hijo.textContent;

    var hijo2 = hijo.nextElementSibling;
    heroe.nombre = hijo2.textContent;

    hijo = hijo2.nextElementSibling;
    heroe.apellido = hijo.textContent;

    hijo2 = hijo.nextElementSibling;
    heroe.alias = hijo2.textContent;
    
    hijo = hijo2.nextElementSibling;
    heroe.edad = hijo.textContent;

    hijo2 = hijo.nextElementSibling;
    heroe.lado = hijo2.textContent;

    var form = document.getElementById('formulario');
    //console.log(form);
    form.getElementsByTagName('input')[0].value = heroe.id;
    form.getElementsByTagName('input')[1].value = heroe.nombre;
    form.getElementsByTagName('input')[2].value = heroe.apellido;
    form.getElementsByTagName('input')[3].value = heroe.alias;
    form.getElementsByTagName('input')[4].value = heroe.edad;

    if(form.getElementsByTagName('input')[5].value == heroe.lado)
    {
        form.getElementsByTagName('input')[5].checked = true;
    }
    else
    {
        form.getElementsByTagName('input')[6].checked = true;
    }

    $('#btnModificar').show();
    $('#btnEliminar').show();
    $('#btnAlta').hide();
    $("#formulario").show("slow");
}

function cerrarFormulario(e)
{
    e.preventDefault();
    $("#formulario").hide("slow");
}

function resaltar(e)
{
    var elemento = e.target;
    //console.log(elemento);
    var padre = elemento.parentElement;
    padre.setAttribute('class', 'resaltar');
}

function quitarResaltar(e)
{
    var elemento = e.target;
    var padre = elemento.parentElement;
    padre.setAttribute('class', '');
}

function limpiarFormulario()
{
    document.getElementById('formulario').reset();
}

