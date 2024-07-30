const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const urlCiudad = `https://api-colombia.com/api/v1/Department/${id}/cities`
const idDepartamento = id




crearTarjetaDetalles(id)

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
    tarjetaDetalles.classList.add('tarjeta-detalles');
    tarjetaDetalles.innerHTML = `
            <h2>${data.name}</h2>
            <p>Descripción: ${data.description}</p>
            <p class="destacado">Population: ${data.population}</p>
            <p>Área: ${data.surface} km²</p>
        `;

    detallesContainer.appendChild(tarjetaDetalles);
}


function crearTarjetasCiudades(idDepartamento) {
    const urlCiudades = `https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`;

    fetch(urlCiudades)
        .then(response => response.json())
        .then(data => {
            const contenedorCiudades = document.getElementById('contenedor-ciudades');
            contenedorCiudades.innerHTML = '';

            data.forEach(ciudad => {
                const tarjetaCiudad = document.createElement('div');
                tarjetaCiudad.classList.add('tarjeta-ciudad');

                tarjetaCiudad.innerHTML = `
                    <h2>${ciudad.name}</h2>
                    <p>${ciudad.description}</p>
                `;

                contenedorCiudades.appendChild(tarjetaCiudad);
            });
        })
        .catch(error => {
            console.error('Error al obtener las ciudades:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
        });
}


function crearTarjetasCiudades() {
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)
        .then(response => response.json())
        .then(data => {
            const departamentosContainer = document.getElementById('contenedor-ciudades');
            departamentosContainer.innerHTML = '';

            data.forEach(ciudad => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta');
                tarjeta.innerHTML = `
                    <h2>${ciudad.name}</h2>
                    <p>${ciudad.description}</p>
                    
                `;



                departamentosContainer.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
crearTarjetasCiudades()

const buscarInput = document.getElementById('buscar');

buscarInput.addEventListener('keyup', () => {
    const textoBuscar = buscarInput.value.toLowerCase();
    const ciudad = document.querySelectorAll('.tarjeta');

    ciudad.forEach(departamento => {
        const nombre = departamento.querySelector('h2').textContent.toLowerCase();
        const descripcion = departamento.querySelector('p').textContent.toLowerCase();

        if (nombre.includes(textoBuscar) || descripcion.includes(textoBuscar)) {
            departamento.style.display = 'block';
        } else {
            departamento.style.display = 'none';
        }
    });
});



function crearTarjetasCiudades() {
    fetch(`https://api-colombia.com/api/v1/Department/${idDepartamento}/cities`)
        .then(response => response.json())
        .then(data => {
            const departamentosContainer = document.getElementById('contenedor-ciudades');
            departamentosContainer.innerHTML = '';

            data.forEach(ciudad => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta');
                tarjeta.innerHTML = `
                    <h2>${ciudad.name}</h2>
                    <p>${ciudad.description}</p>
                    
                `;



                departamentosContainer.appendChild(tarjeta);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
crearTarjetasCiudades()