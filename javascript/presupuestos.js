// Función para validar los datos de contacto
function validarDatosContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const condiciones = document.getElementById('condiciones').checked;

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,15}$/;
    const apellidosRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{1,40}$/;
    const telefonoRegex = /^\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nombreRegex.test(nombre)) {
        alert('Ingrese un nombre válido (solo letras y máximo 15 caracteres).');
        return false;
    }

    if (!apellidosRegex.test(apellidos)) {
        alert('Ingrese unos apellidos válidos (solo letras y máximo 40 caracteres).');
        return false;
    }

    if (!telefonoRegex.test(telefono)) {
        alert('Ingrese un teléfono válido (solo números y exactamente 9 dígitos).');
        return false;
    }

    if (!emailRegex.test(email)) {
        alert('Ingrese un correo electrónico válido.');
        return false;
    }

    if (!condiciones) {
        alert('Debe aceptar las condiciones para enviar el formulario.');
        return false;
    }

    return true;
}

// Función para calcular el presupuesto final
function calcularPresupuesto() {
    const productoSelect = document.getElementById('producto');
    const productoPrecio = parseFloat(productoSelect.value);

    const plazo = parseInt(document.getElementById('plazo').value);
    let descuento = 0;

    // Aplicar descuento según el plazo
    if (plazo >= 6 && plazo <= 12) {
        descuento = 0.1; // 10% de descuento
    } else if (plazo >= 13 && plazo <= 24) {
        descuento = 0.15; // 15% de descuento
    } else if (plazo > 24) {
        descuento = 0.2; // 20% de descuento
    }

    // Calcular el total de extras
    const extras = document.querySelectorAll('input[name="extra"]:checked');
    let totalExtras = 0;
    extras.forEach(extra => {
        totalExtras += parseFloat(extra.value);
    });

    // Calcular el total
    let total = productoPrecio + totalExtras;

    // Aplicar el descuento
    if (descuento > 0) {
        total = total - (total * descuento);
    }

    // Actualizar el presupuesto final
    document.getElementById('presupuestoFinal').textContent = `${total.toFixed(2)}€`;
}

// Event listeners para actualizar el presupuesto en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPresupuesto');
    form.addEventListener('input', calcularPresupuesto);
    form.addEventListener('submit', (e) => {
        if (!validarDatosContacto()) {
            e.preventDefault(); // Evitar el envío del formulario si la validación falla
        }
    });

    // Inicializar el presupuesto
    calcularPresupuesto();
});
