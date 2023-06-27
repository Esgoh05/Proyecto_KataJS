import arregloJedis from './data/mockupJedis.js';

/* 
Rango:

Maestro de la Orden: 5
Maestro Jedi: 4
Caballero Jedi: 3
Padawan: 2
Iniciado Jedi: 1


Estadisticas:

Poder
Velocidad
Salud
*/

/* Arreglo de jedis inicializado en un arreglo vacío */
/* const arregloJedis = [] */

/* Declaraciones */

const setRole = (jedi, role) => {
    const roles = {
        5: "Maestro de la Orden",
        4: "Maestro Jedi",
        3: "Caballero Jedi",
        2: "Padawan",
        1: "Iniciado Jedi"
    };

    const validRole = roles[role];

    if (validRole) {
        // Si el rol es válido, se asigna al jedi
        return {
            ...jedi,
            role: validRole
        };
    } else {
        // Si el rol no es válido, se asigna "Desconocido" al jedi
        return {
            ...jedi,
            role: "Desconocido"
        };
    }
};

const handleFormSubmit = (event) => {
    event.preventDefault(); // Evita que se envíe el formulario automáticamente

    /* Almacenando la información del formulario en un objeto de JavaScript */
    const character = {
        name: form.name.value,
        age: Number(form.age.value),
        team: form.team.value
    };

    /*TODO: Valide tambien que el nombre del jedi no este repetido */
    if (validateCharacter(character)) {
        // Si los datos del personaje son válidos, se agrega al arreglo de jedis y se actualiza la lista
        arregloJedis.push(setRole(character, 1));
        updateJediList();
        console.log(arregloJedis);
    } else {
        // Si hay datos vacíos, se muestra una alerta y se detiene la propagación del evento
        alert("Tienes un dato vacío, verifícalo");
        event.stopPropagation();
    }
};

const handleChangeRole = () => {
    /* TODO: Mejora que se tiene que hacer:
        -Pedir el nombre
        -Guardar el indice con un click en la fila del CRUD
    */
    const index = prompt('Ingrese el índice del jedi:', '');
    /* Que pasa si me da el nombre ¿? */
    const jedi = arregloJedis[index];

    if (jedi) {
        /* TODO: Utilizar una modal de bootstrap */
        const newRole = prompt('Ingrese el nuevo rol:', '');

        if (newRole >= 1 && newRole <= 5) {
            // Si el nuevo rol es válido, se actualiza el rol del jedi en el arreglo de jedis
            arregloJedis[index] = setRole(jedi, Number(newRole));

            updateJediList();
            console.log(arregloJedis);
        } else {
            alert('Rol inválido');
        }
    } else {
        alert('Índice inválido');
    }
};

const handleEditJedi = (event) => {
    const index = event.target.dataset.index;
    const jedi = arregloJedis[index];
    /* TODO: Utilizar formulario en una modal de bootstrap */
    const newName = prompt('Ingrese el nuevo nombre:', jedi.name);
    const newAge = prompt('Ingrese la nueva edad:', jedi.age);
    const newTeam = prompt('Ingrese el nuevo equipo:', jedi.team);

    if (newName && newAge && newTeam) {
        // Si se proporcionan nuevos valores válidos, se actualiza el jedi en el arreglo de jedis
        arregloJedis[index] = {
            ...jedi,
            name: newName,
            age: Number(newAge),
            team: newTeam
        };

        updateJediList();
        console.log(arregloJedis);
    }
};

const handleDeleteJedi = (event) => {
    const index = event.target.dataset.index;
    arregloJedis.splice(index, 1);

    updateJediList();
    console.log(arregloJedis);
};

const handleSortJedis = () => {
    // Implementar el algoritmo de ordenamiento por selección aquí
    selectionSort(arregloJedis);

    // Actualizar la lista de jedis en el DOM
    updateJediList();
};

const handleFilterJedis = () => {
    const filterValue = jediNameFilter.value.toLowerCase().trim();

    // Filtrar los jedis basado en el valor del input de búsqueda
    const filteredJedis = arregloJedis.filter((jedi) =>
        jedi.name.toLowerCase().includes(filterValue)
    );

    // Actualizar la lista de jedis filtrados en el DOM
    updateJediList(filteredJedis);
};

const selectionSort = (array) => {
    const length = array.length;

    // Algoritmo de ordenamiento por selección
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < length; j++) {
            if (array[j].name < array[minIndex].name) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            swap(array, i, minIndex);
        }
    }
};

const swap = (array, index1, index2) => {
    // Intercambiar elementos de posición en el arreglo
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
};

/* Función que crea el CRUD */
//valor por defecto (filteredJedis = arregloJedis), en caso que no se lo pases obtiene el valor de arregloJedis
//se asigna un parametro por defecto, filteredJedis es un parametro que se lo puedo pasar o no. En caso de no 
//pasarlo, se obtendria el valor de arregloJedis
const updateJediList = (filteredJedis = arregloJedis) => {
    const jediList = document.querySelector('#jediList');
    jediList.innerHTML = ''; // Limpiamos el contenido existente

    filteredJedis.forEach((jedi, index) => {
        const row = `
        <tr>
          <td>${jedi.name}</td>
          <td>${jedi.age}</td>
          <td>${jedi.team}</td>
          <td>${jedi.role}</td>
          <td>
            <button type="button" class="btn btn-warning editBtn" data-index="${index}">Editar</button>
            <button type="button" class="btn btn-danger deleteBtn" data-index="${index}">Eliminar</button>
          </td>
        </tr>
      `;

        jediList.innerHTML += row;
    });

    // Agregar eventos a los botones de edición y eliminación
    const editButtons = document.querySelectorAll('.editBtn');
    const deleteButtons = document.querySelectorAll('.deleteBtn');

    editButtons.forEach((button) => {
        button.addEventListener('click', handleEditJedi);
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', handleDeleteJedi);
    });
};

/* Validamos que no haya propiedades vacías */
const validateCharacter = ({ name = "", age = 0, team = "" }) => name !== "" && age !== 0 && team !== ""; // Regresa un booleano

/* Ejecución */

updateJediList();

/*Obteniendo el formulario desde el DOM (desde el html), a través del ID*/
const form = document.querySelector('#characterRegistry');

/* Manejador de evento */
form.addEventListener('submit', handleFormSubmit)

// Agregar evento al botón de cambiar rol
const changeRoleBtn = document.querySelector('#changeRoleBtn');
changeRoleBtn.addEventListener('click', handleChangeRole);

// Agregar evento al botón de ordenar
const sortButton = document.querySelector('#orderButton');
sortButton.addEventListener('click', handleSortJedis);

//Agregar evento al campo de entrada del filtro por nombre
const jediNameFilter = document.querySelector('#jediNameFilter');
jediNameFilter.addEventListener('input', handleFilterJedis);

