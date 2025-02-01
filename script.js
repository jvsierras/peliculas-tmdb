const apiKey = '7787dd5dc689453346d1bca794089006'; // Reemplaza con tu API Key de TMDb
const baseUrl = 'https://api.themoviedb.org/3';
const urlPopular = `${baseUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;
const urlSearch = `${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=`;

const contenedorPeliculas = document.getElementById('peliculas');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

// Cargar películas populares al inicio
cargarPeliculas(urlPopular);

// Función para cargar películas
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
                    <button onclick="mostrarDetallesPelicula(${pelicula.id})">Ver Detalles</button>
                `;
                contenedorPeliculas.appendChild(divPelicula);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Función para mostrar detalles de la película
async function mostrarDetallesPelicula(id) {
    const urlDetalles = `${baseUrl}/movie/${id}?api_key=${apiKey}&language=es-ES`;
    try {
        const response = await fetch(urlDetalles);
        const pelicula = await response.json();

        // Mostrar la información en el modal
        document.getElementById('modal-title').textContent = pelicula.title;
        document.getElementById('modal-poster').src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
        document.getElementById('modal-release-date').textContent = pelicula.release_date;
        document.getElementById('modal-runtime').textContent = pelicula.runtime;
        document.getElementById('modal-genres').textContent = pelicula.genres.map(genre => genre.name).join(', ');
        document.getElementById('modal-overview').textContent = pelicula.overview;
        document.getElementById('modal-vote-average').textContent = pelicula.vote_average;

        modal.style.display = 'block'; // Mostrar el modal
    } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
    }
}

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Implementar búsqueda
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
        cargarPeliculas(urlSearch + query);
    } else {
        cargarPeliculas(urlPopular);
    }
});
