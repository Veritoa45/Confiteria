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
console.log(cardContainer);

productos.forEach((producto) => {
  cardContainer.innerHTML += `
    <div class="cards">
    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
    <h5 class="card-title">${producto.nombre}</h5>
    <div class="card-body">
    <p>Precio: $${producto.precio}</p>
      <a href="#" class="btn">Comprar</a>
    </div>
    </div>
  `;
});

let carrito = [];
let totalGastado = 0;

function mostrarMenu() {
  let mensaje = `Bienvenido a Delice Confiserie\n
Seleccioná un producto para agregar al carrito:\n\n`;
  productos.forEach((prod, index) => {
    mensaje += `${index + 1}. ${prod.nombre} - $${prod.precio} por ${
      prod.cantidad
    }\n`;
  });
  mensaje += "T. Terminar";
}

function procesarProducto(opcion) {
  const index = parseInt(opcion) - 1;
  const producto = productos[index];

  if (!producto) {
    alert("Opción inválida");
    return;
  }

  let cantidad = Number(prompt(`Indica la cantidad del producto seleccionado`));
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad inválida");
    return;
  }

  const subtotal = cantidad * producto.precio;
  totalGastado += subtotal;

  carrito.push({
    nombre: producto.nombre,
    cantidad: cantidad,
    subtotal: subtotal,
  });

  alert(`${cantidad} x ${producto.nombre} agregados al carrito`);
}

function mostrarResumen() {
  let mensaje = "El ticket de tu compra es:\n\n";
  carrito.forEach((item) => {
    mensaje += `${item.cantidad} x ${item.nombre} = $${item.subtotal}\n`;
  });
  mensaje += `\nTotal a pagar: $${totalGastado}`;
  alert(mensaje);
  console.log(mensaje);
}

function iniciarSimulador() {
  let opcion;
  do {
    opcion = mostrarMenu();
    if (opcion.toUpperCase() !== "T") {
      procesarProducto(opcion);
    }
  } while (opcion.toUpperCase() !== "T");

  mostrarResumen();
}

iniciarSimulador();
