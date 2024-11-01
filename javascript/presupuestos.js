// Función para validar los datos de contacto
function validateContactData() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const condiciones = document.getElementById('condiciones').checked;

    const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,15}$/;
    const APELLIDOS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}$/;
    const TELEFONO_REGEX = /^\d{9}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors = [];

    if (!NOMBRE_REGEX.test(nombre)) {
        errors.push('Ingrese un nombre válido (solo letras y máximo 15 caracteres).');
    }

    if (!APELLIDOS_REGEX.test(apellidos)) {
        errors.push('Ingrese unos apellidos válidos (solo letras y máximo 40 caracteres).');
    }

    if (!TELEFONO_REGEX.test(telefono)) {
        errors.push('Ingrese un teléfono válido (solo números y exactamente 9 dígitos).');
    }

    if (!EMAIL_REGEX.test(email)) {
        errors.push('Ingrese un correo electrónico válido.');
    }

    if (!condiciones) {
        errors.push('Debe aceptar las condiciones para enviar el formulario.');
    }

    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    }

    return true;
}

function displayErrors(errors) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = errors.join('<br>');
}

function calcularPresupuesto() {
    const productoSelect = document.getElementById('producto');
    const productoPrecio = parseFloat(productoSelect.value);
    if (isNaN(productoPrecio)) return;

    const plazo = parseInt(document.getElementById('plazo').value);
    let descuento = 0;

    if (plazo >= 6 && plazo <= 12) {
        descuento = 0.1; // 10% de descuento
    } else if (plazo >= 13 && plazo <= 24) {
        descuento = 0.15; // 15% de descuento
    } else if (plazo > 24) {
        descuento = 0.2; // 20% de descuento
    }

    const extras = document.querySelectorAll('input[name="extra"]:checked');
    const totalExtras = Array.from(extras).reduce((sum, extra) => sum + parseFloat(extra.value), 0);

    let total = productoPrecio + totalExtras;

    if (descuento > 0) {
        total -= total * descuento;
    }

    document.getElementById('presupuestoFinal').textContent = `${total.toFixed(2)}€`;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPresupuesto');
    form.addEventListener('input', calcularPresupuesto);
    form.addEventListener('submit', (e) => {
        if (!validateContactData()) {
            e.preventDefault();
        }
    });

    calcularPresupuesto(); // Inicializa el cálculo del presupuesto
});
