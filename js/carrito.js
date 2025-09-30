const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoBody = document.getElementById("carrito-body");
const totalContainer = document.getElementById("total");
const btnFinalizar = document.getElementById("btn-finalizar");

function mostrarCarrito() {
  if (!carritoBody) return;

  carritoBody.innerHTML = "";

  if (carrito.length === 0) {
    carritoBody.innerHTML = `
      <tr>
        <td colspan="4">Tu carrito está vacío</td>
      </tr>
    `;
    totalContainer.textContent = "$0";

    if (btnFinalizar) btnFinalizar.disabled = true;

    return;
  }

  carrito.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="left">${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${item.subtotal}</td>
      <td>
        <button class="btn-eliminar" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    carritoBody.appendChild(tr);
  });

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  totalContainer.textContent = `$${total}`;

  if (btnFinalizar) btnFinalizar.disabled = false;

  document.querySelectorAll(".btn-eliminar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      eliminarDelCarrito(index);
    });
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  if (typeof updateCartCount === "function") updateCartCount();
}

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      Toastify({
        text: "Tu carrito está vacío",
        duration: 2000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #e53935, #c62828)",
        onClick: function () {},
      }).showToast();
      return;
    }

    Swal.fire({
      title: "¿Quiere finalizar la compra?",
      showDenyButton: true,
      confirmButtonText: "Finalizar",
      denyButtonText: "Cancelar",
      confirmButtonColor: "#00b06dff",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Compra confirmada con éxito!",
          icon: "success",
          timer: 3000,
        });

        carrito.length = 0;
        localStorage.removeItem("carrito");
        mostrarCarrito();
      }
    });
  });
}

mostrarCarrito();
