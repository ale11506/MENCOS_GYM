const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCancelar = document.getElementById('btnCancelar');
const btnLimpiar = document.getElementById('btnLimpiar');
const tablaIntructores = document.getElementById('tablaIntructores');
const formulario = document.querySelector('form');

btnModificar.parentElement.style.display = 'none';
btnCancelar.parentElement.style.display = 'none';


const getInstructores = async (alerta = 'si') => {
    const nombre = formulario.in_nombres.value.trim();
    const apellido = formulario.in_apellidos.value.trim();
    const telefono = formulario.in_telefono.value.trim();
    const correo = formulario.in_correo.value.trim();
    
    const url = `/mencos_GYM/controladores/instructores/index.php?in_nombres=${nombre}&in_apellidos=${apellido}&in_telefono=${telefono}&in_correo=${correo}`;
    const config = { method: 'GET' };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaIntructores.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        let contador = 1;

        if (respuesta.ok) {
            if (alerta === 'si') {
                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'instructores encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(instructor => {
                    const tr = document.createElement('tr');
                    const celda1 = document.createElement('td');
                    const celda2 = document.createElement('td');
                    const celda3 = document.createElement('td');
                    const celda4 = document.createElement('td');
                    const celda5 = document.createElement('td');
                    const celda6 = document.createElement('td');
                    const celda7 = document.createElement('td');
                    const buttonModificar = document.createElement('button');
                    const buttonEliminar = document.createElement('button');

                    celda1.innerText = contador;
                    celda2.innerText = instructor.in_nombres;
                    celda3.innerText = instructor.in_apellidos;
                    celda4.innerText = instructor.in_telefono;
                    celda5.innerText = instructor.in_correo;

                    buttonModificar.textContent = 'Modificar';
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100');
                    buttonModificar.addEventListener('click', () => llenardatos(instructor));

                    buttonEliminar.textContent = 'Eliminar';
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    buttonEliminar.addEventListener('click', () => Eliminar(instructor.instructor_id));

                    celda6.appendChild(buttonModificar);
                    celda7.appendChild(buttonEliminar);

                    tr.appendChild(celda1);
                    tr.appendChild(celda2);
                    tr.appendChild(celda3);
                    tr.appendChild(celda4);
                    tr.appendChild(celda5);
                    tr.appendChild(celda6);
                    tr.appendChild(celda7);
                    fragment.appendChild(tr);

                    contador++;
                });
            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'No hay instructores disponibles';
                td.colSpan = 7;  

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
        } else {
            console.log('Error al cargar datos:', respuesta.statusText);
        }

        tablaIntructores.tBodies[0].appendChild(fragment);
    } catch (error) {
        console.log('Error de conexión:', error);
    }
};

// Guardar instructores
const guardarInstructores = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/mencos_GYM/controladores/instructores/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 1);
    formData.delete('instructor_id');
    const config = { method: 'POST', body: formData };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data;

        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: codigo === 1 ? 'success' : 'error',
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (codigo === 1 && respuesta.ok) {
            getInstructores('no');
            formulario.reset();
        } else {
            console.log('Detalle del error:', detalle);
        }
    } catch (error) {
        console.log('Error de conexión:', error);
    }

    btnGuardar.disabled = false;
};

// Llenar Datos en el Formulario
const llenardatos = (instructor) => {
    formulario.instructor_id.value = instructor.instructor_id;
    formulario.in_nombres.value = instructor.in_nombres;
    formulario.in_apellidos.value = instructor.in_apellidos;
    formulario.in_telefono.value = instructor.in_telefono;
    formulario.in_correo.value = instructor.in_correo;

    btnBuscar.parentElement.style.display = 'none';
    btnGuardar.parentElement.style.display = 'none';
    btnLimpiar.parentElement.style.display = 'none';
    btnModificar.parentElement.style.display = '';
    btnCancelar.parentElement.style.display = '';
};

// Cancelar Modificación
const cancelar = () => {
    formulario.reset();
    btnBuscar.parentElement.style.display = '';
    btnGuardar.parentElement.style.display = '';
    btnLimpiar.parentElement.style.display = '';
    btnModificar.parentElement.style.display = 'none';
    btnCancelar.parentElement.style.display = 'none';
};

// Modificar instructores
const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/mencos_GYM/controladores/instructores/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 2);
    formData.append('instructor_id', formulario.instructor_id.value);
    const config = { method: 'POST', body: formData };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data;

        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: codigo === 1 ? 'success' : 'error',
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (respuesta.ok && codigo === 1) {
            formulario.reset();
            getInstructores('no');
            btnBuscar.parentElement.style.display = '';
            btnGuardar.parentElement.style.display = '';
            btnLimpiar.parentElement.style.display = '';
            btnModificar.parentElement.style.display = 'none';
            btnCancelar.parentElement.style.display = 'none';
        } else {
            console.log('Error al modificar:', detalle);
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }

    btnModificar.disabled = false;
};

// Eliminar instructores
const Eliminar = async (instructor_id) => {
    const url = '/mencos_GYM/controladores/instructores/index.php';
    const formData = new FormData();
    formData.append('tipo', 3);
    formData.append('instructor_id', instructor_id);
    const config = { method: 'POST', body: formData };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        const { mensaje, codigo, detalle } = data;

        Swal.mixin({
            toast: true,
            position: "top-start",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: codigo === 1 ? 'success' : 'error',
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (respuesta.ok && codigo === 1) {
            getInstructores('no');
            btnBuscar.parentElement.style.display = '';
            btnGuardar.parentElement.style.display = '';
            btnLimpiar.parentElement.style.display = '';
            btnModificar.parentElement.style.display = 'none';
            btnCancelar.parentElement.style.display = 'none';
        } else {
            console.log('Error al eliminar:', detalle);
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }

    btnModificar.disabled = false;
    btnCancelar.disabled = false;
};

// Event Listeners
formulario.addEventListener('submit', guardarinstructores);
btnBuscar.addEventListener('click', () => getInstructores('si'));
btnModificar.addEventListener('click', modificar);
btnCancelar.addEventListener('click', cancelar);
