const url = "https://api-colombia.com/api/v1/Country/Colombia";




export function obtenerInformacionColombia() {
  const departamentos = [
    // ... datos de los departamentos obtenidos de la API ...
  ];
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Crear un div para mostrar la información
      const divContenedor = document.getElementById("contenedor");
      if (!divContenedor) {
        console.error("El contenedor con ID 'contenedor' no existe.");
        return;
      }

      divContenedor.innerHTML = `
        <h2 >Información sobre Colombia</h2>
        <p>Nombre: ${data.name}</p>
        <p>Descripción: ${data.description}</p>
        <p>Capital: ${data.stateCapital}</p>
        <p>Población: ${data.population}</p>
        <!-- Agrega más detalles según la estructura de datos que devuelve la API -->
      `;

      // Agregar el div al documento (si no está ya agregado)
      if (!document.contains(divContenedor)) {
        document.body.appendChild(divContenedor);
      }
    })
    .catch(error => {
      console.error("Error al obtener la información:", error);
    });
}

// Llama a la función para obtener la información de Colombia
// Función para mostrar las tarjetas de departamentos
// Función para mostrar las tarjetas de departamentos
export function obtenerDepartamentos() {
  fetch('https://api-colombia.com/api/v1/Department')
    .then(response => response.json())
    .then(data => {
      const departamentosContainer = document.getElementById('departamentos');

      // Verificar si el array de datos está vacío
      if (data.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.textContent = "No se encontraron elementos";
        departamentosContainer.appendChild(mensaje);
        return;

      }
      console.log(data.length)
      // Si hay datos, procedemos a crear las tarjetas
      data.forEach(departamento => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
          <div class="card-header">
         
<h2> ${departamento.name}</h2>
         
         <div class="card-body">
          <p>${departamento.description}</p>
          <button class="btn-detalles" data-id="${departamento.id}">Detalles</button>
           </div>
        `;

        tarjeta.querySelector('.btn-detalles').addEventListener('click', () => {
          window.location.href = `detalles.html?id=${departamento.id}`;
        });

        departamentosContainer.appendChild(tarjeta);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}