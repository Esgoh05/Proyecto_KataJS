import arregloUsuariosRegistrados from './datosUsuarios/usuariosRegistrados.js';

const registroUsuariosForm = document.querySelector('#registroUsuariosForm');
const editarUsuariosForm = document.querySelector('#editarUsuariosForm');



const enviarFormRegistroUsuarios = (event) => {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente

    /* Almacenando la información del formulario en un objeto de JavaScript */
    const usuario = {
        nombre: registroUsuariosForm.nameUser.value,
        telefono: Number(registroUsuariosForm.phoneUser.value),
        email: registroUsuariosForm.emailUser.value
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
        console.log("actualizado");
        saveToLocalStorage(registroUsuariosForm);
        console.log("guardado");
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

const editarUsuario = (event) => {
    const index = event.target.dataset.index;
    const usuario = arregloUsuariosRegistrados[index];

    const newName = (usuario.nombre);
    console.log(newName)
    const newPhone = (usuario.telefono);
    const newRole = (usuario.role);
    console.log(newRole)
    const newEmail = (usuario.email);

    document.getElementById("nameEdit").value = newName;
    document.getElementById("phoneEdit").value = newPhone;
    document.getElementById("emailEdit").value = newEmail;
   

    /*if (newName && newPhone && newEmail && newRole) {
        // Si se proporcionan nuevos valores válidos, se actualiza el jedi en el arreglo de jedis
        arregloUsuariosRegistrados[index] = {
            ...jedi,
            nombre: newName,
            telefono: Number(newPhone),
            email: newEmail,
            role: newRole
        };

        actualizaTablaUsuarios();
        console.log(arregloUsuariosRegistrados);
    }*/
};

/* Validamos que no haya propiedades vacías */
const campoNoRegistradoEdit = ({ nombre = "", telefono = 0, email = "", role = "" }) => nombre !== "" && telefono !== 0 && email !== "" && role !== ""; // Regresa un booleano

const deleteUsuario = (event) => {
    Swal.fire({
        title: '¿Usted está seguro de querer eliminar este usuario?',
        text: "Este proceso no podra revertirse!",
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#d33',
        imageUrl: '../kataJs/img/gotita_stop.jpg',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar.'
      }).then((result) => {
        if (result.isConfirmed) {
            const index = event.target.dataset.index;
            arregloUsuariosRegistrados.splice(index, 1);
        
            actualizaTablaUsuarios();
            console.log(arregloUsuariosRegistrados);
            Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado.',
                'success'
            )
        }
      })
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
            <button type="button" class="btn editBtn" data-bs-toggle="modal" data-bs-target="#modalEditUsers" data-index="${index}"">
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
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');

    editButtons.forEach((button) => {
        button.addEventListener('click', editarUsuario);
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteUsuario);
    });
};

function saveToLocalStorage({ nameUser, phoneUser, emailUser }) {
    const { value: name } = nameUser;
    const { value: phone } = phoneUser;
    const { value: email } = emailUser;

    const user = arregloUsuariosRegistrados.find(user => user.nombre == name && user.telefono == phone && user.email == email);
    console.log("pase")

    // Guarda los valores en el almacenamiento local
    for (const prop in user) {
        console.log("dentro")
        localStorage.setItem(prop, user[prop]);
    }
}

const enviarFormEditarUsuarios = (event) => {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente
    console.log("ya entre")
    const usuario = {
        nombre: editarUsuariosForm.nameEdit.value,
        telefono: Number(editarUsuariosForm.phoneEdit.value),
        email: editarUsuariosForm.emailEdit.value,
        role: editarUsuariosForm.usertypeEdit.value
    };

    /*TODO: Valide tambien que el nombre del jedi no este repetido */
    if (campoNoRegistradoEdit(usuario)) {
        // Si los datos del personaje son válidos, se agrega al arreglo de jedis y se actualiza la lista
       Swal.fire({
            icon: 'success',
            title: 'Usuario registrado con exito',
            showConfirmButton: true,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Ok',
          });
        arregloUsuariosRegistrados.push(usuario);
        actualizaTablaUsuarios();
        console.log(arregloUsuariosRegistrados)
        console.log("editando");
    } else {
        // Si hay datos vacíos, se muestra una alerta y se detiene la propagación del evento
        alert("Tienes un dato vacío, verifícalo");
        event.stopPropagation();
    }
};

const userNameElement = document.querySelector('#nameEdit');

const userName = localStorage.getItem('nombre');
if (userName) {
    userNameElement.textContent = `${userName}`;
}

/* Manejador de evento */
registroUsuariosForm.addEventListener('submit', enviarFormRegistroUsuarios);

editarUsuariosForm.addEventListener('submit', enviarFormEditarUsuarios);




