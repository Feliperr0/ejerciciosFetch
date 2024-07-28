const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`https://api-colombia.com/api/v1/Department/${id}`)
    .then(response => response.json())
    .then(data => {
        crearTarjetaDetalles(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    function crearTarjetaDetalles(data) {
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

    crearTarjetaDetalles()