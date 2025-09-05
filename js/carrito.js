const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoContainer = document.getElementById("carrito");
const totalContainer = document.getElementById("total");

function mostrarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  if (!carritoContainer) return;

  carritoContainer.innerHTML = "";
  if (carrito.length === 0) {
    carritoContainer.textContent = "Tu carrito está vacío";
    totalContainer.textContent = "";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "carrito-item";
    div.innerHTML = `
      ${item.cantidad} x ${item.nombre} = $${item.subtotal} 
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;
    carritoContainer.appendChild(div);
  });

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  const totalDiv = document.createElement("div");
  totalDiv.textContent = `Total: $${total}`;
  carritoContainer.appendChild(totalDiv);

  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      eliminarDelCarrito(index);
    });
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  updateCartCount();
}

const btnFinalizar = document.getElementById("btn-finalizar");

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarAlerta("Tu carrito está vacío", "error");
      return;
    }

    carrito.length = 0;
    localStorage.removeItem("carrito");
    mostrarCarrito();

    mostrarAlerta("¡Su compra ha sido confirmada!", "success");
  });
}

mostrarCarrito();
