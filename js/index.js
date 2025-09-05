const productos = [
  { nombre: "Tortas", precio: 15000, imagen: "./public/tortas.jpg" },
  { nombre: "Facturas", precio: 800, imagen: "./public/facturas.jpg" },
  { nombre: "Alfajores", precio: 750, imagen: "./public/alfajores.jpg" },
  { nombre: "Masas", precio: 24000, imagen: "./public/masas.jpg" },
  { nombre: "Bombones", precio: 60000, imagen: "./public/chocolate.jpg" },
  { nombre: "Brownies", precio: 20000, imagen: "./public/brownies.jpg" },
  { nombre: "Donas", precio: 3500, imagen: "./public/donuts.jpg" },
  { nombre: "Cupcakes", precio: 2500, imagen: "./public/cupcakes.jpg" },
  { nombre: "Macarons", precio: 2000, imagen: "./public/macarons.jpg" },
];

const cardContainer = document.getElementById("box");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos() {
  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "cards";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
      <h5 class="card-title">${producto.nombre}</h5>
      <div class="card-body">
        <p>Precio: $${producto.precio}</p>
        <button class="btn" id="btn-${index}">Comprar</button>
      </div>
    `;
    cardContainer.appendChild(card);

    const boton = document.getElementById(`btn-${index}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
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

  mostrarAlerta(`${producto.nombre} agregado al carrito`, "success");
}

mostrarProductos();
