// favorites.js

document.addEventListener('DOMContentLoaded', function() {
    // Crear la estructura HTML para la página de favoritos
    const body = document.body;

    const favoritesSection = document.createElement('section');
    favoritesSection.innerHTML = `
        <h2>Mis Favoritos</h2>
        <div id="favorites-list"></div>
    `;

    body.appendChild(favoritesSection);

    // Mostrar los productos favoritos
    displayFavorites();
});

function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesList.innerHTML = ''; // Limpiar la lista antes de agregar los elementos

    if (favorites.length > 0) {
        favorites.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'favorite-product';

            // Verifica que la ruta de la imagen se está recuperando correctamente
            const defaultImage = defaultImagesById[product.id] || "./assets/default-image.jpg";
            const imageSrc = product.imageSrc || defaultImage;

            // Crear la estructura del producto
            productItem.innerHTML = `
                <div class="product-card">
                    <img class="product-img" src="${imageSrc}" alt="${product.title}" />
                    <div class="product-info">
                        <span class="product-title">${product.title}</span>
                        <span class="product-color">${product.color || 'Color no disponible'}</span> 
                        <div class="product-description">
                            <span class="product-label">Descripción</span>
                            <p>${product.description || 'Descripción no disponible'}</p>
                        </div>
                        <div class="product-price-block">
                            <span class="product-price">${product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
                        </div>
                    </div>
                </div>
            `;

            favoritesList.appendChild(productItem);
        });
    } else {
        favoritesList.innerHTML = "<p>No tienes productos en favoritos.</p>";
    }
}
