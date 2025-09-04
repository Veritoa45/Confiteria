function updateCartCount() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = totalItems;
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);
