let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cardContainer = document.getElementById("box");

async function obtenerProductos() {
  try {
    const res = await fetch("productos.json");
    productos = await res.json();
    mostrarProductos();
  } catch (err) {
    Toastify({
      text: "No se puedieron cargar los productos",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #e53935, #c62828)",
      onClick: function () {},
    }).showToast();
  }
}

function mostrarProductos() {
  if (!cardContainer) return;
  cardContainer.innerHTML = "";
  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "cards";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
      <h5 class="card-title">${producto.nombre}</h5>
      <div class="card-body">
        <p>Precio: $${producto.precio}</p>
        <button class="btn btn-comprar" data-index="${index}">Comprar</button>
      </div>
    `;
    cardContainer.appendChild(card);
  });

  cardContainer.addEventListener("click", (e) => {
    if (e.target.matches(".btn-comprar")) {
      const idx = parseInt(e.target.dataset.index, 10);
      agregarAlCarrito(productos[idx]);
    }
  });
}

function agregarAlCarrito(producto) {
  const itemExistente = carrito.find((item) => item.nombre === producto.nombre);

  if (itemExistente) {
    itemExistente.cantidad += 1;
    itemExistente.subtotal = itemExistente.cantidad * producto.precio;
  } else {
    carrito.push({
      nombre: producto.nombre,
      cantidad: 1,
      subtotal: producto.precio,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  updateCartCount();

  Toastify({
    text: `${producto.nombre} fue agregado al carrito`,
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    onClick: function () {},
  }).showToast();
}

obtenerProductos();
