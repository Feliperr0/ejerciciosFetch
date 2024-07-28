
import {obtenerInformacionColombia, obtenerDepartamentos} from "./main.js"



const contenedorTarjetas = document.getElementById('containerId');
const contenedorInfo = document.getElementById("contenedor")
const searchInput = document.getElementById('buscar');
obtenerInformacionColombia()
obtenerDepartamentos();

const buscarInput = document.getElementById('buscar');

buscarInput.addEventListener('keyup', () => {
    const textoBuscar = buscarInput.value.toLowerCase();
    const departamentos = document.querySelectorAll('.tarjeta');

    departamentos.forEach(departamento => {
        const nombre = departamento.querySelector('h2').textContent.toLowerCase();
        const descripcion = departamento.querySelector('p').textContent.toLowerCase();

        if (nombre.includes(textoBuscar) || descripcion.includes(textoBuscar)) {
            departamento.style.display = 'block';
        } else {
            departamento.style.display = 'none';
        }
    });
});
