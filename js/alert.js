function mostrarAlerta(mensaje, tipo = "success") {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("custom-alert-message");

  if (alertBox && alertMessage) {
    alertMessage.textContent = mensaje;
    alertBox.className = `custom-alert ${tipo}`;
    alertBox.classList.remove("hidden");

    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 2500);
  }
}
