function ejecutarTransaccion(transaccion, heroe) {

    switch (transaccion) {

        case "Mostrar":

            mostrarFormulario();            
            break;

        case "MostrarHeroe":

            mostrarFormulario(heroe);
            break;

        case "Alta":

            altaPersonaje();
            break;

        case "Baja":

            eliminarPersonaje();
            break;

        case "Modificacion":

            modificarPersonaje();
            break;

        case "Insertar":

            insertarHeroe(heroe);
            break;

        case "Eliminar":

            eliminarHeroe(heroe);
            break;

        case "Modificar":

            modificarHeroe(heroe);
            break;

        case "actualizarLista":
            traerListaHeroes(manejarActualizarLista);
            break;
    }

}

function manejarActualizarLista(l){
    lista = l;
    actualizarTabla(lista);
}


