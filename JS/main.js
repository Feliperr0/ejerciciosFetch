

function obtenerInformacionColombia() {
    const url = "https://api-colombia.com/api/v1/Country/Colombia";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Crear un div para mostrar la información
        const divContenedor = document.createElement("div");
        divContenedor.innerHTML = `
          <h2>Información sobre Colombia</h2>
          <p>Nombre: ${data.name}</p>
          <p>Capital: ${data.capital}</p>
          <p>Población: ${data.population}</p>
          <!-- Agrega más detalles según la estructura de datos que devuelve la API -->
        `;
  
        // Agregar el div al documento
        document.body.appendChild(divContenedor);
      })
      .catch(error => {
        console.error("Error al obtener la información:", error);
      });
  }
  
  // Llama a la función para obtener la información de Colombia
  obtenerInformacionColombia();

console.log(data)