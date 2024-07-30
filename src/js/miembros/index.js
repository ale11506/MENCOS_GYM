const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCancelar = document.getElementById('btnCancelar');
const btnLimpiar = document.getElementById('btnLimpiar');
const tablaMiembros = document.getElementById('tablaMiembros');
const formulario = document.querySelector('form');

btnModificar.parentElement.style.display = 'none';
btnCancelar.parentElement.style.display = 'none';

// Obtener Miembros
const getMiembros = async (alerta = 'si') => {
    const nombre = formulario.mi_nombres.value.trim();
    const apellido = formulario.mi_apellidos.value.trim();
    const telefono = formulario.mi_telefono.value.trim();
    const correo = formulario.mi_correo.value.trim();
    
    const url = `/mencos_GYM/controladores/miembros/index.php?mi_nombres=${nombre}&mi_apellidos=${apellido}&mi_telefono=${telefono}&mi_correo=${correo}`;
    const config = { 
        method: 'GET' 
    }

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaMiembros.tBodies[0].innerHTML = '';
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
                    title: 'Miembros encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(miembro => {
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
                    celda2.innerText = miembro.mi_nombres;
                    celda3.innerText = miembro.mi_apellidos;
                    celda4.innerText = miembro.mi_telefono;
                    celda5.innerText = miembro.mi_correo;

                    buttonModificar.textContent = 'Modificar';
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100');
                    buttonModificar.addEventListener('click', () => llenardatos(miembro));

                    buttonEliminar.textContent = 'Eliminar';
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    buttonEliminar.addEventListener('click', () => Eliminar(miembro.miembro_id));

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
                td.innerText = 'No hay miembros disponibles';
                td.colSpan = 7;  // Ajusta el colspan si es necesario

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
        } else {
            console.log('Error al cargar datos:', respuesta.statusText);
        }

        tablaMiembros.tBodies[0].appendChild(fragment);
    } catch (error) {
        console.log('Error de conexión:', error);
    }
};

// Guardar Miembros
const guardarMiembros = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/mencos_GYM/controladores/miembros/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 1);
    formData.delete('miembro_id');
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
            getMiembros('no');
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
const llenardatos = (miembro) => {
    formulario.miembro_id.value = miembro.miembro_id;
    formulario.mi_nombres.value = miembro.mi_nombres;
    formulario.mi_apellidos.value = miembro.mi_apellidos;
    formulario.mi_telefono.value = miembro.mi_telefono;
    formulario.mi_correo.value = miembro.mi_correo;

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

// Modificar Miembros
const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/mencos_GYM/controladores/miembros/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 2);
    formData.append('miembro_id', formulario.miembro_id.value);
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
            getMiembros('no');
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

// Eliminar Miembros
const Eliminar = async (miembro_id) => {
    const url = '/mencos_GYM/controladores/miembros/index.php';
    const formData = new FormData();
    formData.append('tipo', 3);
    formData.append('miembro_id', miembro_id);
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
            getMiembros('no');
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
formulario.addEventListener('submit', guardarMiembros);
btnBuscar.addEventListener('click', getMiembros);
btnModificar.addEventListener('click', modificar);
btnCancelar.addEventListener('click', cancelar);
