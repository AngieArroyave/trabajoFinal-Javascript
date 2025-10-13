/* =========== Formulario de contacto ========*/

const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const mensajeInput = document.getElementById('mensaje');
const formulario = document.getElementById('formulario');


function validarNombre() {
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Z]*$/
    if (nombre.length <= 10 && nombrePattern.test(nombre)) {
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('nombreError').textContent = '';

    }else {
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('nombreError').textContent = 'El nombre de usuario debe tener como máximo 10 carácteres y empezar con una letra';
    }
}

function validarApellido() {
    const apellido = apellidoInput.value;
    const apellidoPattern = /^[a-zA-Z]*$/
    if (apellido.length <= 15 && apellidoPattern.test(apellido)) {
        apellidoInput.classList.add('valido');
        apellidoInput.classList.remove('invalido');
        document.getElementById('apellidoError').textContent = '';

    }else {
        apellidoInput.classList.add('invalido');
        apellidoInput.classList.remove('valido');
        document.getElementById('apellidoError').textContent = 'El apellido debe tener como máximo 15 carácteres y empezar con una letra';
    }
}

function validarTelefono() {
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/
    if (telefonoPattern.test(telefono)) {
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('telefonoError').textContent = '';

    }else {
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('telefonoError').textContent = 'El teléfono debe tener 9 dígitos y contener solo números.'
    }
}

function validarEmail() {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailPattern.test(email)) {
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('emailError').textContent = '';

    }else {
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('emailError').textContent = 'Ingrese un correo electrónico válido.'
    }
}

function validarMensaje() {
     const mensaje = mensajeInput.value;
     const mensajePattern = /^[a-zA-Z][a-zA-Z0-9]*$/
    if (mensaje.length >= 20 || mensajePattern.test(mensaje)) {
        mensajeInput.classList.add('valido');
        mensajeInput.classList.remove('invalido');
        document.getElementById('mensajeError').textContent = '';

    }else {
        mensajeInput.classList.add('invalido');
        mensajeInput.classList.remove('valido');
        document.getElementById('mensajeError').textContent = 'Ingrese mensaje de texto válido y al menos 20 carácteres.'
    }
}

function resetFormulario (){
    formulario.reset();
    nombreInput.classList.remove('valido');
    apellidoInput.classList.remove('valido');
    telefonoInput.classList.remove('valido');
    emailInput.classList.remove('valido');
    mensajeInput.classList.remove('valido');
};


nombreInput.addEventListener('input', validarNombre);
apellidoInput.addEventListener('input', validarApellido);
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);
mensajeInput.addEventListener('input', validarMensaje);

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    validarNombre();
    validarApellido();
    validarTelefono();
    validarEmail();
    validarMensaje();

    if(nombreInput.classList.contains('valido') && apellidoInput.classList.contains('valido') && telefonoInput.classList.contains('valido') && emailInput.classList.contains('valido') && mensajeInput.classList.contains('valido')){
        alert ('Formulario enviado correctamente.')
    }else {
        alert ('Por favor, rellena los campos correctamente, fíjate en los parámetros que te pasamos.')
    }
});

/* ============= Formulario Presupuesto =========== */
    
const form = document.getElementById('formPresupuesto');
const carritoUl = document.getElementById('carrito');
const totalFinal = document.getElementById('total-final');
const btnAñadir = document.getElementById('añadir-al-carrito');

btnAñadir.addEventListener('click', (e) => {
  e.preventDefault();

  // Obtener datos del producto
  const productoSelect = document.getElementById('seleccion-producto');
  const productoNombre = productoSelect.options[productoSelect.selectedIndex].text;
  const productoPrecio = parseFloat(productoSelect.options[productoSelect.selectedIndex].dataset.precio);

  // Cantidad
  const cantidad = parseInt(document.getElementById('cantidad').value);

  // Extras
  let extrasTotal = 0;
  if(document.getElementById('extra-patacones').checked) extrasTotal += 5;
  if(document.getElementById('extra-arepas').checked) extrasTotal += 6;
  if(document.getElementById('extra-yucas').checked) extrasTotal += 8;

  // Plazo
  const plazoSelect = document.getElementById('seleccion-plazo');
  const descuento = parseFloat(plazoSelect.options[plazoSelect.selectedIndex].dataset.descuento);

  // Calcular total
  let subtotal = (productoPrecio * cantidad) + extrasTotal;
  let total = subtotal - (subtotal * descuento / 100);

  // Añadir al carrito visualmente
  const li = document.createElement('li');
  li.textContent = `${productoNombre} x${cantidad} + extras: ${extrasTotal}€ - Total: ${total.toFixed(2)}€`;
  carritoUl.appendChild(li);

  // Actualizar total general
  totalFinal.textContent = `Total: ${total.toFixed(2)}€`;
});

// Resetear carrito al limpiar el formulario
form.addEventListener('reset', () => {
  carritoUl.innerHTML = '';
  totalFinal.textContent = 'Total: 0€';
});
