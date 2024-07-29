
import { obtenerInformacionColombia, obtenerDepartamentos } from "./main.js"

fetch('https://api-colombia.com/api/v1/Department')
  .then(response => response.json())
  .then(data => {
    // Manejar los datos de los departamentos
    console.log(data);

    // Iterar sobre los departamentos y mostrar su nombre, por ejemplo
    data.forEach(departamento => {
      console.log(departamento.name);
    });
  })
  .catch(error => {
    console.error('Error al obtener los departamentos:', error);
  });

const contenedorTarjetas = document.getElementById('containerId');
const contenedorInfo = document.getElementById("contenedor")

obtenerInformacionColombia()



const buscarInput = document.getElementById('buscar');

buscarInput.addEventListener('keyup', () => {
    const textoBuscar = buscarInput.value.toLowerCase();
    const departamentos = document.querySelectorAll('.card');

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
obtenerDepartamentos();