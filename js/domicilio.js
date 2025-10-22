/* =========== Formulario de contacto ========*/

const formulario = document.getElementById("formulario-unico");

const campos = {
  nombre: document.getElementById("nombre"),
  apellido: document.getElementById("apellido"),
  telefono: document.getElementById("telefono"),
  email: document.getElementById("email"),
  mensaje: document.getElementById("mensaje"),
  producto: document.getElementById("seleccion-producto"),
  cantidad: document.getElementById("cantidad"),
  plazo: document.getElementById("seleccion-plazo"),
};

const totalFinal = document.getElementById("total-final");

// ======== VALIDACIONES ========

function validarTexto(campo, max, idError) {
  const valor = campo.value.trim();
  const pattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,\s!?]+$/;
  if (valor.length > 0 && valor.length <= max && pattern.test(valor)) {
    campo.classList.add("valido");
    campo.classList.remove("invalido");
    document.getElementById(idError).textContent = "";
    return true;
  } else {
    campo.classList.add("invalido");
    campo.classList.remove("valido");
    document.getElementById(idError).textContent = "Ingrese un texto válido.";
    return false;
  }
}

function validarTelefono() {
  const valor = campos.telefono.value.trim();
  const pattern = /^\d{9}$/;
  if (pattern.test(valor)) {
    campos.telefono.classList.add("valido");
    campos.telefono.classList.remove("invalido");
    telefonoError.textContent = "";
    return true;
  } else {
    campos.telefono.classList.add("invalido");
    campos.telefono.classList.remove("valido");
    telefonoError.textContent = "El teléfono debe tener 9 dígitos.";
    return false;
  }
}

function validarEmail() {
  const valor = campos.email.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (pattern.test(valor)) {
    campos.email.classList.add("valido");
    campos.email.classList.remove("invalido");
    emailError.textContent = "";
    return true;
  } else {
    campos.email.classList.add("invalido");
    campos.email.classList.remove("valido");
    emailError.textContent = "Email inválido.";
    return false;
  }
}

// ======== CÁLCULO DEL PEDIDO ========

function calcularTotal() {
  const producto = campos.producto.options[campos.producto.selectedIndex];
  const precio = parseFloat(producto.dataset.precio || 0);
  const cantidad = parseInt(campos.cantidad.value) || 1;

  let extras = 0;
  if (document.getElementById("extra-patacones").checked) extras += 5;
  if (document.getElementById("extra-arepas").checked) extras += 6;
  if (document.getElementById("extra-yucas").checked) extras += 8;

  const descuento = parseFloat(campos.plazo.options[campos.plazo.selectedIndex].dataset.descuento);

  let subtotal = (precio * cantidad) + extras;
  let total = subtotal - (subtotal * descuento / 100);

  totalFinal.textContent = `Total: ${total.toFixed(2)}€`;
}

campos.producto.addEventListener("change", calcularTotal);
campos.cantidad.addEventListener("input", calcularTotal);
campos.plazo.addEventListener("change", calcularTotal);
document.querySelectorAll(".extras input").forEach(c => c.addEventListener("change", calcularTotal));

campos.nombre.addEventListener("input", () => validarTexto(campos.nombre, 15, "nombreError"));
campos.apellido.addEventListener("input", () => validarTexto(campos.apellido, 20, "apellidoError"));
campos.mensaje.addEventListener("input", () => validarTexto(campos.mensaje, 300, "mensajeError", 10));
campos.telefono.addEventListener("input", validarTelefono);
campos.email.addEventListener("input", validarEmail);

// ======== ENVÍO ========

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido =
    validarTexto(campos.nombre, 15, "nombreError") &&
    validarTexto(campos.apellido, 20, "apellidoError") &&
    validarTelefono() &&
    validarEmail() &&
    validarTexto(campos.mensaje, 300, "mensajeError", 10) && campos.producto.value !== "";

  if (valido) {
    alert("Formulario enviado correctamente 🍔🍺");
    formulario.reset();
    totalFinal.textContent = "Total: 0€";
    
    Object.values(campos).forEach(campo => campo.classList.remove("valido", "invalido"));
  } else {
    alert("Por favor, revisa los campos marcados en rojo.");
  }
});


   

    
   
    