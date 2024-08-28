// Función para cargar productos del carrito desde localStorage
function loadCartProducts() {
  const cartItems = localStorage.getItem("cart");
  return cartItems ? JSON.parse(cartItems) : [];
}

const defaultImagesById = {
  1: "./assets/default-ipad.jpg",
  2: "./assets/default-iphone.webp",
  3: "./assets/default-macbook.webp",
  4: "./assets/default-watch.webp",
  5: "./assets/default-ipods.webp",
  6: "./assets/default-imac.webp",
  // Añadir más id si es necesario
};

// Función para crear la tarjeta de producto en el carrito
function createCartCard(product) {
  const defaultImage = defaultImagesById[product.id] || "./assets/default-image.jpg";
  const imageSrc = product.imageSrc || defaultImage;

  return `
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
                  <span class="product-discount">${product.discount}</span>
              </div>
              <div class="product-tax-policy">
                  Incluye impuesto País y percepción AFIP
              </div>
              <div class="Quantity">
                  <span class="Quantity-product">Cantidad: </span>
                  <input type="number" name="quantity" min="1" value="${product.quantity}" id="${product.id}" onchange="changeQuantity(event)">
              </div>
          </div>
      </div>
  `;
}

// Función para manejar el cambio de cantidad en los productos del carrito
function changeQuantity(event) {
  // Obtiene el ID del producto desde el atributo id del input
  const productId = parseInt(event.target.id, 10);
  // Obtiene la nueva cantidad desde el valor del input
  const newQuantity = parseInt(event.target.value, 10);

  // Carga los productos del carrito desde localStorage
  let cartProducts = loadCartProducts();

  // Busca el producto correspondiente en el array
  const productIndex = cartProducts.findIndex(product => product.id === productId);

  if (productIndex !== -1 && newQuantity > 0) {
    // Actualiza la cantidad del producto
    cartProducts[productIndex].quantity = newQuantity;

    // Guarda los productos actualizados en localStorage
    localStorage.setItem("cart", JSON.stringify(cartProducts));

    // Vuelve a actualizar la vista del carrito
    updateCartView();
  }
}

// Función para calcular el total a pagar
function calculateTotal() {
  const cartProducts = loadCartProducts();
  return cartProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

// Función para actualizar la vista de productos en el carrito
function updateCartView() {
  const cartProducts = loadCartProducts();
  const cartProductsContainer = document.getElementById("cartproducts");

  if (cartProductsContainer) {
      if (cartProducts.length > 0) {
          const productCardsHTML = cartProducts.map(createCartCard).join("");
          cartProductsContainer.innerHTML = productCardsHTML;

          // Actualiza el total a pagar
          const totalPrice = calculateTotal();
          document.getElementById("total-price").textContent = totalPrice.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
      } else {
          cartProductsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
          const totalPriceElement = document.getElementById("total-price");
          if (totalPriceElement) {
              totalPriceElement.textContent = (0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
          }
      }
  } else {
      console.error('Elemento con id "cart-products-container" no encontrado.');
  }
}


// Llama a la función para actualizar la vista cuando la página se carga
document.addEventListener("DOMContentLoaded", () => {
  updateCartView();
});
