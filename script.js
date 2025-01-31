const apiKey = '7787dd5dc689453346d1bca794089006'; // Reemplaza con tu API Key de TMDb
const baseUrl = 'https://api.themoviedb.org/3';
const urlPopular = `${baseUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;
const urlSearch = `${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=`;

const contenedorPeliculas = document.getElementById('peliculas');
const searchInput = document.getElementById('search');

function cargarPeliculas(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            contenedorPeliculas.innerHTML = '';
            data.results.forEach(pelicula => {
                const divPelicula = document.createElement('div');
                divPelicula.classList.add('pelicula');
                divPelicula.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                    <h3>${pelicula.title}</h3>
                    <p>${pelicula.release_date}</p>
                `;
                contenedorPeliculas.appendChild(divPelicula);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Cargar películas populares al inicio
cargarPeliculas(urlPopular);

// Implementar búsqueda
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
        cargarPeliculas(urlSearch + query);
    } else {
        cargarPeliculas(urlPopular);
    }
});
