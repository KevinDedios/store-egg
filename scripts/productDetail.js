function printDetails(id) {
  // Buscar el producto con el ID especificado
  const product = products.find((each) => each.id === parseInt(id, 10));
  /*En resumen, se usa 10 para asegurarse de que la conversión se haga en base decimal,
  que es la base estándar para los números en la mayoría de los contextos.*/

  if (!product) {
    console.error("Producto no encontrado");
    return;
  }

  // Crear una plantilla de detalles del producto
  const detailsTemplate = `
    <section class="product-images-block">
      <div class="product-images">
        ${product.images.map((image) => `
          <img
            class="mini-img"
            src="${image}"  // Mostrar imágenes correctamente
            alt="${product.title}"
            onclick="changeMini(event)"
          />
        `).join('')}
      </div>
      <img
        class="big-img"
        id="big-img"
        src="${product.images[0]}"  // Mostrar la primera imagen como principal
        alt="${product.title}"
      />
    </section>
    <div class="product-description-block">
      <h1 class="product-title">${product.title}</h1>
      <form class="product-selector">
        <fieldset class="product-fieldset">
          <label class="product-label" for="color">Color</label>
          <select class="product-select" id="color">
            ${product.colors.map(
              (color) => `<option value="${color}">${color}</option>`
            ).join("")}
          </select>
        </fieldset>
        <fieldset class="product-fieldset">
          <label class="product-label" for="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value="1"
            onchange="changeSubtotal(event)"
          />
        </fieldset>
      </form>
      <div class="product-description">
        <span class="product-label">Descripción</span>
        <p>${product.description}</p>
      </div>
    </div>
    <div class="product-checkout-block">
      <div class="checkout-container">
        <span class="checkout-total-label">Total:</span>
        <h2 id="price" class="checkout-total-price">${product.price}</h2>
        <p class="checkout-description">
          Incluye impuesto PAIS y percepción AFIP. Podés recuperar AR$
          50711 haciendo la solicitud en AFIP.
        </p>
        <ul class="checkout-policy-list">
          <li>
            <span class="policy-icon">
              <img src="./assets/truck.png" alt="Truck"/>
            </span>
            <span class="policy-desc">
              Agrega el producto al carrito para conocer los costos de envío
            </span>
          </li>
          <li>
            <span class="policy-icon">
              <img src="./assets/plane.png" alt="Plane"/>
            </span>
            <span class="policy-desc">
              Recibí aproximadamente entre 10 y 15 días hábiles, seleccionando envío normal
            </span>
          </li>
        </ul>
        <div class="checkout-process">
          <div class="top">
            <input type="number" min="1" value="1" onchange="changeSubtotal(event)" />
            <button type="button" class="cart-btn" onclick="saveProduct(${id})">
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Seleccionar el elemento donde se mostrará la plantilla
  const detailsSelector = document.querySelector("#details");

  // Actualizar el HTML del elemento seleccionado con la plantilla
  detailsSelector.innerHTML = detailsTemplate;
}

// Capturar el parámetro ID de la URL
const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

// Llamar a la función printDetails con el ID capturado
printDetails(id);

// Función para cambiar la imagen grande
function changeMini(event) {
  const selectedSrc = event.target.src;
  const bigImgSelector = document.querySelector("#big-img");
  if (bigImgSelector) {
    bigImgSelector.src = selectedSrc;
  } else {
    console.error("No se encontró el elemento con ID 'big-img'");
  }
}

function changeSubtotal(event) {
  // Obtener la cantidad de productos desde el evento
  const quantity = parseInt(event.target.value, 10);
  console.log("Cantidad:", quantity); // Depura la cantidad

  // Verificar que la cantidad es válida
  if (isNaN(quantity) || quantity <= 0) {
    console.error("Cantidad no válida");
    return;
  }
  
  // Buscar el producto con el ID especificado
  const id = new URLSearchParams(location.search).get('id');
  const product = products.find((each) => each.id === parseInt(id, 10));
  
  if (!product) {
    console.error("Producto no encontrado");
    return;
  }

  // Verificar que el precio del producto sea un número
  const price = parseFloat(product.price);
  console.log("Precio del producto:", price); // Depura el precio
  
  if (isNaN(price)) {
    console.error("Precio no válido");
    return;
  }
  
  // Calcular el subtotal
  const subtotal = quantity * price;
  
  // Seleccionar la etiqueta donde se renderiza el subtotal
  const priceElement = document.querySelector("#price");
  
  if (priceElement) {
    priceElement.textContent = `$${subtotal.toFixed(2)}`;
  } else {
    console.error("No se encontró el elemento con ID 'price'");
  }
}

function saveProduct(id) {
  // Buscar el producto con el ID especificado
  const found = products.find((each) => each.id === parseInt(id, 10));

  if (!found) {
    console.error("Producto no encontrado");
    return;
  }

  // Capturar los datos del producto seleccionados por el usuario
  const product = {
    id: id,
    title: found.title,
    price: found.price,
    image: found.images[0],  // Tomar la primera imagen
    color: document.querySelector("#color").value,
    quantity: parseInt(document.querySelector("#quantity").value, 10),
  };

  // Verificar si ya existe una clave "cart" en localStorage
  let cart = localStorage.getItem("cart");
  
  if (cart) {
    // Si existe, parsear el JSON para convertirlo a un array de productos
    cart = JSON.parse(cart);
  } else {
    // Si no existe, inicializar un nuevo array para el carrito
    cart = [];
  }

  // Agregar el nuevo producto al array del carrito
  cart.push(product);

  // Convertir el array de productos a JSON
  const stringifyCart = JSON.stringify(cart);

  // Guardar el array actualizado en localStorage
  localStorage.setItem("cart", stringifyCart);

  console.log(`Producto con ID ${id} guardado en el carrito.`);
}
