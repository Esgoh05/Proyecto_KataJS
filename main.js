import arregloUsuariosRegistrados from './datosUsuarios/usuariosRegistrados.js';

const registroUsuariosForm = document.querySelector('#registroUsuariosForm');
const cerrarModal = document.querySelector('#exampleModal');


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
        Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con exito',
            showConfirmButton: true,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Ok',
          });
        arregloUsuariosRegistrados.push(rolePredeterminado(usuario, 1));
        actualizaTablaUsuarios();
        console.log(arregloUsuariosRegistrados)
        console.log("aaaa");
    } else {
        // Si hay datos vacíos, se muestra una alerta y se detiene la propagación del evento
        alert("Tienes un dato vacío, verifícalo");
        //showAlert({ message: 'Tienes un dato vacío, verifícalo' });
        event.stopPropagation();
    }
};

/* Validamos que no haya propiedades vacías */
const campoNoRegistrado = ({ nombre = "", telefono = 0, email = "" }) => nombre !== "" && telefono !== 0 && email !== ""; // Regresa un booleano

const rolePredeterminado = (roleInicio, role) => {
    const roles = {
        1: "User",
        2: "Admin"
    };

    const validRole = roles[role];

    if (validRole) {
        // Si el rol es válido, se asigna al roleInicial
        return {
            ...roleInicio,
            role: validRole
        };
    } else {
        // Si el rol no es válido, se asigna "Desconocido" al jedi
        return {
            ...roleInicio,
            role: "Desconocido"
        };
    }
};

const actualizaTablaUsuarios = (filteredJedis = arregloUsuariosRegistrados) => {
    const listaUsuarios = document.querySelector('#listaUsuarios');
    listaUsuarios.innerHTML = ''; // Limpiamos el contenido existente

    filteredJedis.forEach((user, index) => {
        const row = `
        <tr>
          <td>${user.nombre}</td>
          <td>${user.telefono}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button type="button" class="btn editBtn" data-index="${index}">
                <i class="bi bi-pencil-fill"></i>
                Editar
            </button>
          </td>
          <td>
          <button type="button" class="btn btn-danger deleteBtn" data-index="${index}">
                <i class="bi bi-trash3-fill"></i>
                Eliminar
          </button>
          </td>
        </tr>
      `;

        listaUsuarios.innerHTML += row;
    });

    // Agregar eventos a los botones de edición y eliminación
    /*const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');

    editButtons.forEach((button) => {
        button.addEventListener('click', handleEditJedi);
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteJedi);
    });*/
};

/* Manejador de evento */
registroUsuariosForm.addEventListener('submit', enviarFormRegistroUsuarios);

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })



