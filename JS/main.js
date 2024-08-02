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
        <img src="../img/2feec4e5-2d62-4426-8131-c5b98413c0e3.jpg" alt="cholombia">
     
      `;

      if (!document.contains(divContenedor)) {
        document.body.appendChild(divContenedor);
      }
    })
    .catch(error => {
      console.error("Error al obtener la información:", error);
    });
}




export  function obtenerDepartamentos() {
  fetch('https://api-colombia.com/api/v1/Department')
    .then(response => response.json())
    .then(data => {
      const departamentosContainer = document.getElementById('departamentos');

      if (data.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.textContent = "No se encontraron elementos";
        departamentosContainer.appendChild(mensaje);
        return;
      }

    
      const filterAndSortData = (searchText, sortAscending) => {
        const filteredData = data.filter(departamento => {
          const normalizarNombre = departamento.name.toLowerCase();

          const normalizarTexto = searchText.toLowerCase();
          return (
            normalizarNombre.includes(normalizarTexto)
         
          );
        });

        return sortAscending
          ? filteredData.slice().sort((a, b) => a.population - b.population) 
          : filteredData;
      };

      const searchInput = document.getElementById('buscar');
      if (searchInput) {
        searchInput.addEventListener('keyup', () => {
          const filteredAndSortedData = filterAndSortData(
            searchInput.value,
            sortCheckbox.checked
          );
          departamentosContainer.innerHTML = '';
          renderDepartmentos(filteredAndSortedData);
        });
      }

      const sortCheckbox = document.getElementById('checkMenorMayor');
      if (sortCheckbox) {
        sortCheckbox.addEventListener('click', () => {
          const filteredAndSortedData = filterAndSortData(
            searchInput.value,
            sortCheckbox.checked
          );
          departamentosContainer.innerHTML = '';
          renderDepartmentos(filteredAndSortedData);
        });
      }

      renderDepartmentos(filterAndSortData('', false));
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
        <p class="card-text">Población: ${departamento.population}</p>
        <img class="imagen " src="https://scontent.fmex3-3.fna.fbcdn.net/v/t39.30808-6/325137955_1575502666209963_7383806074385855204_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHsdBh0ldZ1w3qjRjuS71-Gh4asS-Xk5ZSHhqxL5eTllA9PFwd8hMwI-XDAAD__virx748j0yl3_---8CviPqIc&_nc_ohc=eY_EjmUFen8Q7kNvgFnA3wc&_nc_ht=scontent.fmex3-3.fna&oh=00_AYBifn60iF4Ym0WqyzyDmQEYKbzIMPBZgHtoY95uCDLVWw&oe=66B1E322" alt="colombia">
        <button class="btn-detalles btn btn-primary justify-content-center" data-id="${departamento.id}">Detalles</button>
      </div>
    `;

    tarjeta.querySelector('.btn-detalles').addEventListener('click', () => {
      window.location.href = `detalles.html?id=${departamento.id}`;
    });

    departamentosContainer.appendChild(tarjeta);
  });
}