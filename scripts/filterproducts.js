// Función para capturar el texto de búsqueda y filtrar productos
function captureText(event) {
    // Obtener el valor del campo de búsqueda
    const searchText = event.target.value.toLowerCase();
  
    // Filtrar productos basándose en el texto capturado
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchText)
    );
  
    // Actualizar la vista con los productos filtrados
    updateProductView(filteredProducts);
  }
  
  // Función para actualizar la vista con los productos a mostrar
  function updateProductView(productsToDisplay) {
    const productsSelector = document.getElementById("products");
  
    // Generar el template para las tarjetas de productos filtrados
    const productsTemplate = `
      ${productsToDisplay.map(product => `
        <article class="product-card">
          <img class="product-img" src="${product.imageSrc}" alt="${product.title}" />
          <div class="product-info">
            <span class="product-title">${product.title}</span>
            <span class="product-description">${product.description}</span>
            <div class="product-price-block">
              <span class="product-price">${product.price}</span>
              <span class="product-discount">${product.discount}</span>
            </div>
            <div class="product-tax-policy">
              Incluye impuesto País y percepción AFIP
            </div>
          </div>
        </article>
      `).join('')}
    `;
  
    // Insertar el template en el contenedor de productos
    productsSelector.innerHTML = productsTemplate;
  }
  