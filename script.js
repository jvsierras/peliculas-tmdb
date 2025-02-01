const apiKey = '7787dd5dc689453346d1bca794089006'; // Reemplaza con tu API Key de TMDb
const baseUrl = 'https://api.themoviedb.org/3';
const urlPopular = `${baseUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;
const urlTopRated = `${baseUrl}/movie/top-rated?api_key=${apiKey}&language=es-ES`;
const urlSearch = `${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=`;

const contenedorPeliculas = document.getElementById('peliculas');
const searchInput = document.getElementById('search');
const reproductor = document.getElementById('reproductor');
const iframeReproductor = document.getElementById('iframeReproductor');

async function buscarEnlaceAbyss(titulo) {
    // Esta función debería ser implementada en el servidor si usas Puppeteer
    console.log("Buscando enlace para:", titulo);
    return null; // Retorna null o el enlace encontrado
}

async function buscarEnlacelookmovie(titulo) {
    // Esta función debería ser implementada en el servidor si usas Puppeteer
    console.log("Buscando enlace para:", titulo);
    return null; // Retorna null o el enlace encontrado
}

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
                    <button onclick="verPelicula('${pelicula.title}')">Ver Película</button>
                `;
                contenedorPeliculas.appendChild(divPelicula);
            });
        })
        .catch(error => console.error('Error:', error));
}

async function verPelicula(titulo) {
    const enlacePelicula = await obtenerEnlacePelícula(titulo); // Esta función debe devolver el enlace correcto
    if (enlacePelicula) {
        iframeReproductor.src = enlacePelicula;
        reproductor.style.display = 'flex';
    } else {
        alert('Enlace no disponible');
    }
}

async function obtenerEnlacePelícula(titulo) {
    // Aquí debes implementar la lógica para obtener el enlace de la película
    // Por ejemplo, puedes usar un objeto con títulos y enlaces predefinidos
    const enlaces = {
        "Título de la Película 1": "https://www.2embed.to/embed/tmdb/movie?id=12345",
        "Kraven the Hunter (2024)": "https://short.icu/XdKaWzYnhp",
        "CAPITAN AMÉRICA EL PRIMER VENGADOR": "https://1024terabox.com/s/125WIz6lKv_ZjdJKz5LH-5Q",
        "Guardianes de la Galaxia: Volumen 3": "https://multiembed.mov/directstream.php?video_id=tt6791350"
    };
    return enlaces[titulo] || null;
}

// Cerrar el reproductor al hacer clic fuera del iframe
reproductor.addEventListener('click', (e) => {
    if (e.target === reproductor) {
        reproductor.style.display = 'none';
        iframeReproductor.src = '';
    }
});

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
