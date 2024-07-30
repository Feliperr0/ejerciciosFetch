const contenedorTabla = document.getElementById('contenedorTabla');
const busquedaInput = document.getElementById('busqueda');
const riesgo1Checkbox = document.getElementById('riesgo1');
const riesgo2Checkbox = document.getElementById('riesgo2');
busquedaInput.addEventListener('keyup', actualizarTabla);
riesgo1Checkbox.addEventListener('click', actualizarTabla);
riesgo2Checkbox.addEventListener('click', actualizarTabla);

let especies = []; 

crearTablaEspeciesInvasoras();
function crearTablaEspeciesInvasoras() {
  fetch('https://api-colombia.com/api/v1/InvasiveSpecie')
    .then(response => response.json())
    .then(data => {
    
      if (Array.isArray(data)) {
        especies = data;
        actualizarTabla(data);
      } else {
        console.error('Los datos no son un arreglo. Verifica la estructura de la API.');
      }
    })
    .catch(error => {
      console.log('Error al cargar los datos:', error);
 
      contenedorTabla.innerHTML = '<p>Error</p>';
    });
}

function actualizarTabla(data) {
    fetch('https://api-colombia.com/api/v1/InvasiveSpecie')
    .then(response => response.json())
    .then(data => {
      // Verifica si los datos son un arreglo
      if (Array.isArray(data)) {
        especies = data;
        actualizarTabla(data);
      } else {
        console.log('Los datos no son un arreglo. Verifica la estructura de la API.');
      }
    })
    .catch(error => {
      console.log('Error', error);
      // Aquí puedes mostrar un mensaje de error al usuario
      contenedorTabla.innerHTML = '<p>Error al cargar los datos. Por favor, intenta más tarde.</p>';
    });
  const textoBusqueda = busquedaInput.value.toLowerCase();
  const riesgo1 = riesgo1Checkbox.checked;
  const riesgo2 = riesgo2Checkbox.checked;

  let tablaHTML = '<table><thead><tr><th>Nombre</th><th>Nombre Científico</th><th>Nivel de Riesgo</th><th>Imagen</th><th>Impacto</th><th>Manejo</th></tr></thead><tbody>';

  especies.forEach(especie => {
    const nombre = especie.name.toLowerCase();
    const nombreCientifico = especie.scientificName.toLowerCase();
    const riesgo = especie.riskLevel;

    if ((nombre.includes(textoBusqueda) || nombreCientifico.includes(textoBusqueda)) &&
        (riesgo === 1 && riesgo1 || riesgo === 2 && riesgo2 || (!riesgo1 && !riesgo2))) {
      tablaHTML += `<tr class="${riesgo === 1 ? 'table-success' : 'table-primary'}"><td>${especie.name}</td><td>${especie.scientificName}</td><td>${riesgo}</td><td><img class="img" src="${especie.urlImage}"></td><td>${especie.impact}</td><td>${especie.manage}</td></tr>`;
    }
  });
 
  tablaHTML += '</tbody></table>';

  contenedorTabla.innerHTML = tablaHTML;
}



