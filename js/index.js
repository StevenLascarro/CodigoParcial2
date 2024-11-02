const apiKey = 'DEMO_KEY'; // Cambia por tu api_key si lo obtuviste
const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
let currentPage = 1;
const earthDate = '2015-07-02';

document.getElementById('find-button').addEventListener('click', () => {
    const date = document.getElementById('date-input').value;
    fetchPhotos(date, 1);
});

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        fetchPhotos(earthDate, --currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    fetchPhotos(earthDate, ++currentPage);
});

// Función para obtener fotos
async function fetchPhotos(date, page) {
    const response = await fetch(`${baseUrl}?earth_date=${date}&api_key=${apiKey}&page=${page}`);
    const data = await response.json();
    
    displayPhotos(data.photos);
}

// Función para mostrar las fotos
function displayPhotos(photos) {
    const photosBody = document.getElementById('photos-body');
    photosBody.innerHTML = ''; // Limpiar tabla anterior

    if (photos.length > 0) {
        photos.forEach(photo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${photo.id}</td>
                <td>${photo.rover.name}</td>
                <td>${photo.camera.name}</td>
                <td><button class="more-button" data-id="${photo.id}">More</button></td> <!-- Botón "More" -->
            `;
            photosBody.appendChild(row);
        });

        // Mostrar detalles de la primera foto
        showPhotoDetails(photos[0]);

        // Agregar evento de clic a los botones "More"
        const moreButtons = document.querySelectorAll('.more-button');
        moreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const photoId = button.getAttribute('data-id');
                const selectedPhoto = photos.find(photo => photo.id === parseInt(photoId));
                showPhotoDetails(selectedPhoto);
            });
        });
    } else {
        alert('No hay fotos para esta fecha.');
    }
}

// Función para mostrar los detalles de la foto
function showPhotoDetails(photo) {
    document.getElementById('photo-image').src = photo.img_src;
    document.getElementById('photo-info').innerText = `Id: ${photo.id}, Martian sol: ${photo.sol}, Earth date: ${photo.earth_date}`;
}


// Cargar fotos al cargar la página
window.onload = () => {
    fetchPhotos(earthDate, currentPage);
};
