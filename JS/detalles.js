const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const urlCiudad = `https://api-colombia.com/api/v1/Department/${id}/cities`
const urlAreas = `https://api-colombia.com/api/v1/Department/${id}/naturalareas`
const idDepartamento = id
const departamentosContainer = document.getElementById('contenedor-ciudades');
const areasContainer = document.getElementById('contenedor-areas');
const checkboxCiudades = document.getElementById('ciudades');
checkboxCiudades.addEventListener('click', ocultarMostrarCiudades);





function ocultarMostrarCiudades() {
    const tarjetasCiudad = document.querySelectorAll('.tarjeta-ciudad');
    const checkbox = document.getElementById('ciudades');
  
    tarjetasCiudad.forEach(tarjeta => {
      tarjeta.style.display = checkbox.checked ? 'none' : 'block';
    });
  }
crearTarjetaDetalles(idDepartamento)



function crearTarjetaDetalles(data) {
    fetch(`https://api-colombia.com/api/v1/Department/${id}`)
        .then(response => response.json())
        .then(data => {
            crearTarjetaDetalles(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    const detallesContainer = document.getElementById('detalles');
    detallesContainer.innerHTML = '';

    const tarjetaDetalles = document.createElement('div');
    tarjetaDetalles.classList.add('card')
    tarjetaDetalles.classList.add('tarjeta-ciudad');
    tarjetaDetalles.classList.add('container');
    tarjetaDetalles.classList.add('row');
    tarjetaDetalles.classList.add('col-md-12');
    tarjetaDetalles.classList.add('card-fixed');
    tarjetaDetalles.classList.add('m-3');
    tarjetaDetalles.classList.add('d-flex');
    tarjetaDetalles.classList.add('text-center');

    tarjetaDetalles.innerHTML = `
            <h2 class="card-header">${data.name}</h2>
            <div class="card-body">
            <p>${data.description}</p>
             <p>Municipalidades: ${data.municipalities}</p>
            <p class="destacado">Población: ${data.population}</p>
            <p>Área: ${data.surface} km²</p>
            <img id="img" src="https://content.r9cdn.net/rimg/dimg/34/a4/c96235ea-city-30430-177d8921835.jpg?crop=true&width=1020&height=498" alt="cholombia">
            </div>

        `;

    detallesContainer.appendChild(tarjetaDetalles);
}


const buscarInput = document.getElementById('buscar');



function crearTarjetasCiudades() {
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)

        .then(response => response.json())
        .then(data => {
            departamentosContainer.innerHTML = '';

            data.forEach(ciudad => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('card');
                tarjeta.classList.add('tarjeta-ciudad');
                tarjeta.classList.add('container');
                tarjeta.classList.add('row');
                tarjeta.classList.add('col-md-5');
                tarjeta.classList.add('card-fixed');
                tarjeta.classList.add('m-3');
                tarjeta.classList.add('d-flex');
                tarjeta.classList.add('text-center');

                tarjeta.innerHTML = `
                        <h5 class="card-header">${ciudad.name}</h5>
                        <div class="card-body">
                        <p>${ciudad.description}</p>
                        <img id="imgDet" src="https://content.r9cdn.net/rimg/dimg/34/a4/c96235ea-city-30430-177d8921835.jpg?crop=true&width=1020&height=498" alt="cholombia">
                        </div>
            
                    `;
                departamentosContainer.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




function filtrarYRenderizarCiudades(textoBusqueda) {
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)
        .then(response => response.json())
        .then(data => {

            departamentosContainer.innerHTML = '';


            let ciudadesFiltradas;
            if (textoBusqueda === '') {

                ciudadesFiltradas = data;
            } else {

                ciudadesFiltradas = data.filter(ciudad =>
                    ciudad.name.toLowerCase().includes(textoBusqueda.toLowerCase())
                );
            }


            if (ciudadesFiltradas.length === 0) {

                const mensajeNoEncontrado = document.createElement('p');
                mensajeNoEncontrado.textContent = 'No se encontraron elementos';
                departamentosContainer.appendChild(mensajeNoEncontrado);
            } else {

                ciudadesFiltradas.forEach(ciudad => {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('card');
                    tarjeta.classList.add('tarjeta');
                    tarjeta.classList.add('container');
                    tarjeta.classList.add('row');
                    tarjeta.classList.add('col-md-5');
                    tarjeta.classList.add('card-fixed');
                    tarjeta.classList.add('m-3');
                    tarjeta.classList.add('d-flex');
                    tarjeta.classList.add('text-center');

                    tarjeta.innerHTML = `
                        <h5 class="card-header">${ciudad.name}</h5>
                        <div class="card-body">
                        <p>${ciudad.description}</p>
                        <img id="imgDet" src="https://content.r9cdn.net/rimg/dimg/34/a4/c96235ea-city-30430-177d8921835.jpg?crop=true&width=1020&height=498" alt="cholombia">
                        </div>
            
                    `;

                    departamentosContainer.appendChild(tarjeta);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


buscarInput.addEventListener('keyup', () => {
    const textoBusqueda = buscarInput.value;
    filtrarYRenderizarCiudades(textoBusqueda);
});
filtrarYRenderizarCiudades('');




const buscarAreas = document.getElementById('buscarAreas');
const checkboxAreas = document.getElementById('areasNaturales');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

// Función para crear una tarjeta
function crearTarjeta(nombre) {

  return ` 
  <div class="card container col-md-5 row">
  <h5 class="card-header">${nombre}</h5>
                        <div class="card-body">
                        <p></p>
                        <img id="imgDet" src="https://content.r9cdn.net/rimg/dimg/34/a4/c96235ea-city-30430-177d8921835.jpg?crop=true&width=1020&height=498" alt="cholombia">
                        </div>
                        </div>`;
}

// Función para generar las tarjetas y aplicar los filtros
function generarTarjetas(datos) {
  let html = '';

  datos.forEach(area => {
    if (area.naturalAreas) {
      area.naturalAreas.forEach(naturalArea => {
        html += crearTarjeta(naturalArea.name);
      });
    }
  });

  contenedorTarjetas.innerHTML = html;
  aplicarFiltros();
}

// Función para aplicar los filtros
function aplicarFiltros() {
  const textoFiltro = buscarAreas.value.toLowerCase();
  const ocultarTodas = checkboxAreas.checked;

  contenedorTarjetas.querySelectorAll('.card').forEach(tarjeta => {
    const textoTarjeta = tarjeta.textContent.toLowerCase();
    const mostrarTarjeta = !ocultarTodas && textoTarjeta.includes(textoFiltro);
    tarjeta.style.display = mostrarTarjeta ? 'block' : 'none';
  });
}

// Obtener los datos de la API y generar las tarjetas
fetch('https://api-colombia.com/api/v1/Department/1/naturalareas')
  .then(response => response.json())
  .then(data => {
    if (Array.isArray(data)) {
      generarTarjetas(data);
    } else {
      console.error('La respuesta de la API no es un array');
    }
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

// Eventos para los filtros
buscarAreas.addEventListener('keyup', aplicarFiltros);
checkboxAreas.addEventListener('click', aplicarFiltros);
