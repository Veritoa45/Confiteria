const productos = [
  { nombre: "Tortas", precio: 15000, cantidad: "unidad" },
  { nombre: "Facturas", precio: 800, cantidad: "unidad" },
  { nombre: "Alfajores", precio: 750, cantidad: "unidad" },
  { nombre: "Masas", precio: 24000, cantidad: "kilo" },
  { nombre: "Bombones", precio: 60000, cantidad: "kilo" },
  { nombre: "Brownies", precio: 20000, cantidad: "kilo" },
  { nombre: "Donas", precio: 3500, cantidad: "unidad" },
];

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

  return prompt(mensaje);
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
