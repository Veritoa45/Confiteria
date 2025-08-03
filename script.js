// Variables y arrays
const productos = [
  { nombre: "Pan", precio: 100 },
  { nombre: "Tortas", precio: 500 },
  { nombre: "Facturas", precio: 80 },
  { nombre: "Alfajores", precio: 150 },
  { nombre: "Masas", precio: 300 },
  { nombre: "Bombones", precio: 200 },
  { nombre: "Brownies", precio: 120 },
  { nombre: "Donas", precio: 90 },
];

let carrito = [];
let totalGastado = 0;

function mostrarMenu() {
  let mensaje = "¿Qué producto querés comprar?\n";
  productos.forEach((prod, index) => {
    mensaje += `${index + 1}. ${prod.nombre} - $${prod.precio}\n`;
  });
  mensaje += "T. Terminar";

  return prompt(mensaje);
}

// Procesar la compra del producto
function procesarProducto(opcion) {
  const index = parseInt(opcion) - 1;
  const producto = productos[index];

  if (!producto) {
    alert("Opción inválida");
    return;
  }

  let cantidad = parseInt(
    prompt(`¿Cuántos ${producto.nombre} querés comprar?`)
  );
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

  alert(
    `${cantidad} x ${producto.nombre} agregados al carrito. Subtotal: $${subtotal}`
  );
}

// Mostrar el resumen final
function mostrarResumen() {
  let mensaje = "Resumen de tu compra:\n\n";
  carrito.forEach((item) => {
    mensaje += `${item.cantidad} x ${item.nombre} = $${item.subtotal}\n`;
  });
  mensaje += `\nTotal a pagar: $${totalGastado}`;
  alert(mensaje);
  console.log(mensaje);
}

// Simulador principal
function iniciarSimulador() {
  alert("Bienvenido al simulador de carrito de compras");

  let opcion;
  do {
    opcion = mostrarMenu();
    if (opcion.toUpperCase() !== "T") {
      procesarProducto(opcion);
    }
  } while (opcion.toUpperCase() !== "T");

  mostrarResumen();
}

// Llamada al simulador
iniciarSimulador();
