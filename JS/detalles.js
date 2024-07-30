const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const urlCiudad = `https://api-colombia.com/api/v1/Department/${id}/cities`
const idDepartamento = id





crearTarjetaDetalles(id)
crearTarjetasCiudades(idDepartamento)

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
    tarjetaDetalles.classList.add('tarjeta');
        tarjetaDetalles.classList.add('card')
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
            const departamentosContainer = document.getElementById('contenedor-ciudades');
            departamentosContainer.innerHTML = '';

            data.forEach(ciudad => {
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
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



const departamentosContainer = document.getElementById('contenedor-ciudades');

// Función para filtrar y renderizar las tarjetas
function filtrarYRenderizarCiudades(textoBusqueda) {
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)
        .then(response => response.json())
        .then(data => {
            // Limpiamos el contenedor antes de renderizar las nuevas tarjetas
            departamentosContainer.innerHTML = '';

            // Filtramos las ciudades según el texto de búsqueda
            let ciudadesFiltradas;
            if (textoBusqueda === '') {
                // Si el input está vacío, mostramos todas las ciudades
                ciudadesFiltradas = data;
            } else {
                // Si hay texto de búsqueda, filtramos por nombre de ciudad
                ciudadesFiltradas = data.filter(ciudad =>
                    ciudad.name.toLowerCase().includes(textoBusqueda.toLowerCase())
                );
            }

            // Verificamos si hay ciudades filtradas
            if (ciudadesFiltradas.length === 0) {
                // Si no hay resultados, mostramos un mensaje
                const mensajeNoEncontrado = document.createElement('p');
                mensajeNoEncontrado.textContent = 'No se encontraron elementos';
                departamentosContainer.appendChild(mensajeNoEncontrado);
            } else {
                // Si hay resultados, creamos las tarjetas
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

// Event listener para el input de búsqueda
buscarInput.addEventListener('keyup', () => {
    const textoBusqueda = buscarInput.value;
    filtrarYRenderizarCiudades(textoBusqueda);
});
filtrarYRenderizarCiudades('');










