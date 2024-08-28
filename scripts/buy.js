document.addEventListener("DOMContentLoaded", function() {
    const buySelector = document.getElementById("cart-btn");

    if (buySelector) {
        buySelector.addEventListener("click", function() {
            console.log("Botón COMPRAR clickeado");

            let cartProducts = [];
            localStorage.removeItem("cart");

            updateCartView();

            const cartProductsContainer = document.getElementById("cartproducts");
            if (cartProductsContainer) {
                cartProductsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
            }

            const totalPriceElement = document.getElementById("total-price");
            if (totalPriceElement) {
                totalPriceElement.textContent = (0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
            }

            const totalContainer = document.getElementById("total-container");
            if (totalContainer) {
                totalContainer.innerHTML = `
                    <h4 class="total-title">Resumen del pedido</h4>
                    <p class="total-p">Total: ${(0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                    <div class="product-tax-policy"> Incluye impuesto País y percepción AFIP </div>
                `;
            }
        });
    } else {
        console.error('Elemento con id "cart-btn" no encontrado.');
    }
});
