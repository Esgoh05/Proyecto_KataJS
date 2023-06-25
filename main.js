//import arregloUsuariosRegistrados from './datosUsuarios/usuariosRegistrados';

const registroUsuariosForm = document.querySelector('#registroUsuariosForm');


const enviarFormRegistroUsuarios = (event) => {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente

    /* Almacenando la información del formulario en un objeto de JavaScript */
    const usuario = {
        nombre: registroUsuariosForm.name.value,
        telefono: Number(registroUsuariosForm.phone.value),
        email: registroUsuariosForm.email.value
    };

    /*TODO: Valide tambien que el nombre del jedi no este repetido */
    if (campoNoRegistrado(usuario)) {
        // Si los datos del personaje son válidos, se agrega al arreglo de jedis y se actualiza la lista
        //arregloUsuariosRegistrados.push(setRole(usuario, 1));
        //updateJediList();
        //console.log(arregloUsuariosRegistrados)
        console.log("aaaa");
    } else {
        // Si hay datos vacíos, se muestra una alerta y se detiene la propagación del evento
        alert("Tienes un dato vacío, verifícalo");
        event.stopPropagation();
    }
};

/* Validamos que no haya propiedades vacías */
const campoNoRegistrado = ({ nombre = "", telefono = 0, email = "" }) => nombre !== "" && telefono !== 0 && email !== ""; // Regresa un booleano

/* Manejador de evento */
registroUsuariosForm.addEventListener('submit', enviarFormRegistroUsuarios);

