const apiKey = '7787dd5dc689453346d1bca794089006'; // Reemplaza con tu API Key de TMDb
const baseUrl = 'https://api.themoviedb.org/3';
const urlPopular = `${baseUrl}/movie/popular?api_key=${apiKey}&language=es-ES`;
const urlPopular = `${baseUrl}/movie/top-rated?api_key=${apiKey}&language=es-ES`;
const urlSearch = `${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=`;

const contenedorPeliculas = document.getElementById('peliculas');
const searchInput = document.getElementById('search');
const reproductor = document.getElementById('reproductor');
const iframeReproductor = document.getElementById('iframeReproductor');

const puppeteer = require('puppeteer');

async function buscarEnlaceAbyss(titulo) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://abyss.to/dashboard/manager/search?q=${encodeURIComponent(titulo)}`);

    const enlace = await page.evaluate(() => {
        const resultado = document.querySelector('.resultado a');
        return resultado ? resultado.href : null;
    });

    await browser.close();
    return enlace;
}

// Ejemplo de uso
buscarEnlaceAbyss("Avengers: Endgame").then(enlace => {
    if (enlace) {
        console.log("Enlace encontrado:", enlace);
    } else {
        console.log("Enlace no disponible.");
    }
});

const puppeteer = require('puppeteer');

async function buscarEnlacelookmovie(titulo) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://lookmovie.skin//search?q=${encodeURIComponent(titulo)}`);

    const enlace = await page.evaluate(() => {
        const resultado = document.querySelector('.resultado a');
        return resultado ? resultado.href : null;
    });

    await browser.close();
    return enlace;
}

// Ejemplo de uso
buscarEnlacelookmovie("Avengers: Endgame").then(enlace => {
    if (enlace) {
        console.log("Enlace encontrado:", enlace);
    } else {
        console.log("Enlace no disponible.");
    }
});


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

function verPelicula(titulo) {
    // Aquí puedes buscar el enlace de la película en TeraBox, Abyss.to, 2embed.to, etc.
    const enlacePelícula = obtenerEnlacePelícula(titulo); // Esta función debe devolver el enlace correcto
    if (enlacePelícula) {
        iframeReproductor.src = enlacePelícula;
        reproductor.style.display = 'flex';
    } else {
        alert('Enlace no disponible');
    }
}

function obtenerEnlacePelícula(titulo) {
    // Aquí debes implementar la lógica para obtener el enlace de la película
    // Por ejemplo, puedes usar un objeto con títulos y enlaces predefinidos
    const enlaces = {
        "Título de la Película 1": "https://www.2embed.to/embed/tmdb/movie?id=12345",
        "Kraven the Hunter (2024)": "https://short.icu/XdKaWzYnhp",
        "CAPITAN AMÉRICA EL PRIMER VENGADOR": "https://1024terabox.com/s/125WIz6lKv_ZjdJKz5LH-5Q" ,
        "Guardianes de la Galaxia: Volumen 3" : "https://multiembed.mov/directstream.php?video_id=tt6791350"
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
