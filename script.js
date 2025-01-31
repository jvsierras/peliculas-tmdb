const apiKey = '7787dd5dc689453346d1bca794089006'; // Reemplaza con tu API Key de TMDb
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const peliculas = data.results;
        const contenedorPeliculas = document.getElementById('peliculas');
        peliculas.forEach(pelicula => {
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
