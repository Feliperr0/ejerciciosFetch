const url = "https://api-colombia.com/api/v1/Country/Colombia";




export function obtenerInformacionColombia() {
    fetch(url)
    .then(response => response.json())
    .then(data => {
     
      const divContenedor = document.getElementById("contenedor");
      if (!divContenedor) {
        console.error("El contenedor con ID 'contenedor' no existe.");
        return;
      }

      divContenedor.innerHTML = `
        <h2 >Información sobre Colombia</h2>
        <p>${data.description}</p>
        <p>Capital: ${data.stateCapital}</p>
        <p>Población: ${data.population} </p>
        <!-- Agrega más detalles según la estructura de datos que devuelve la API -->
      `;

      if (!document.contains(divContenedor)) {
        document.body.appendChild(divContenedor);
      }
    })
    .catch(error => {
      console.error("Error al obtener la información:", error);
    });
}


// Función para mostrar las tarjetas de departamentos

export function obtenerDepartamentos() {
  fetch('https://api-colombia.com/api/v1/Department')
    .then(response => response.json())
    .then(data => {
      const departamentosContainer = document.getElementById('departamentos');

    
      if (data.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.textContent = "No se encontraron elementos"; //no funciona D:
        departamentosContainer.appendChild(mensaje);
        return;
      }

     
      const filtrarDepartamentos = (searchText) => {
        return data.filter(departamento => {
          const normalizarNombre = departamento.name.toLowerCase();
          const normalizarDescripcion = departamento.description.toLowerCase();
          const normalizarTExto = searchText.toLowerCase();
          return (normalizarNombre.includes(normalizarTExto) ||
          normalizarDescripcion.includes(normalizarTExto));
        });
      };

      
      const searchInput = document.getElementById('buscar'); 
      if (searchInput) {
        searchInput.addEventListener('keyup', () => {
          const filteredData = filtrarDepartamentos(searchInput.value);
          departamentosContainer.innerHTML = ''; 
          renderDepartmentos(filteredData); 
        });
      }
      
      renderDepartmentos(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function renderDepartmentos(departments) {
  const departamentosContainer = document.getElementById('departamentos');
  departments.forEach(departamento => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.classList.add('container');
    tarjeta.classList.add('row');
    tarjeta.classList.add('col-md-5');
    tarjeta.classList.add('card-fixed');
    tarjeta.classList.add('m-3');
    tarjeta.classList.add('d-flex');
    tarjeta.classList.add('text-center');
    tarjeta.innerHTML = `
      <h5 class="card-header">${departamento.name}</h5>
      <div class="card-body">
        <p class="card-text">${departamento.description}</p>
        <button class="btn-detalles btn btn-primary justify-content-center" data-id="${departamento.id}">Detalles</button>
      </div>
    `;

    tarjeta.querySelector('.btn-detalles').addEventListener('click', () => {
      window.location.href = `detalles.html?id=${departamento.id}`;
    });

    departamentosContainer.appendChild(tarjeta);
  });
}



