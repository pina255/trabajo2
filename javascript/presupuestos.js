document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formPresupuesto');

    // Calcular presupuesto y validar los datos cuando se modifique algún campo
    form.addEventListener('input', () => {
        calcularPresupuesto();
        validateContactData();
    });

    // Validar y procesar el presupuesto sin enviar el formulario (sin recargar la página)
    form.addEventListener('submit', (e) => {
        e.preventDefault();  // Evitar que el formulario se envíe (y recargue la página)
        
        // Validación
        if (!validateContactData() || !validarPresupuesto()) {
            return;  // Si hay errores, no continuar con el proceso
        }

        // Si todo está correcto, muestra el presupuesto y muestra un mensaje de éxito
        mostrarPresupuesto();
        alert("Presupuesto procesado correctamente"); // Puedes reemplazar esto por un mensaje más estilizado en la página
    });

    // Ejecutar la función de cálculo de presupuesto al cargar la página
    calcularPresupuesto();

    // Validación de los datos del contacto
    function validateContactData() {
        const existingErrorContainer = document.getElementById('errorContainer');
        if (existingErrorContainer) existingErrorContainer.remove();

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
        const errorsMap = {};

        if (!NOMBRE_REGEX.test(nombre)) {
            errors.push('Ingrese un nombre válido (solo letras y máximo 15 caracteres).');
            errorsMap['nombre'] = true;
        }
        if (!APELLIDOS_REGEX.test(apellidos)) {
            errors.push('Ingrese unos apellidos válidos (solo letras y máximo 40 caracteres).');
            errorsMap['apellidos'] = true;
        }
        if (!TELEFONO_REGEX.test(telefono)) {
            errors.push('Ingrese un teléfono válido (solo números y exactamente 9 dígitos).');
            errorsMap['telefono'] = true;
        }
        if (!EMAIL_REGEX.test(email)) {
            errors.push('Ingrese un correo electrónico válido.');
            errorsMap['email'] = true;
        }
        if (!condiciones) {
            errors.push('Debe aceptar las condiciones para enviar el formulario.');
            errorsMap['condiciones'] = true;
        }

        highlightInvalidFields(errorsMap);

        if (errors.length > 0) {
            displayErrors(errors);
            return false;
        }
        return true;
    }

    function highlightInvalidFields(errorsMap) {
        const fields = ['nombre', 'apellidos', 'telefono', 'email', 'condiciones'];
        fields.forEach((field) => {
            const input = document.getElementById(field);
            if (errorsMap[field]) {
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });
    }

    function displayErrors(errors) {
        let errorContainer = document.getElementById('errorContainer');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'errorContainer';
            form.insertBefore(errorContainer, form.firstChild);
        }

        errorContainer.innerHTML = errors.map((err) => `<p style="color: red;">${err}</p>`).join('');
    }

    function calcularPresupuesto() {
        const productoSelect = document.getElementById('producto');
        const productoPrecio = parseFloat(productoSelect.value) || 0;

        const plazo = parseInt(document.getElementById('plazo').value) || 0;
        let descuento = 0;

        if (plazo >= 6 && plazo <= 12) {
            descuento = 0.1;
        } else if (plazo >= 13 && plazo <= 24) {
            descuento = 0.15;
        } else if (plazo > 24) {
            descuento = 0.2;
        }

        const extras = document.querySelectorAll('input[name="extra"]:checked');
        const totalExtras = Array.from(extras).reduce((sum, extra) => sum + parseFloat(extra.value), 0);

        let total = productoPrecio + totalExtras;
        if (descuento > 0) total -= total * descuento;

        document.getElementById('presupuestoFinal').textContent = `${total.toFixed(2)}€`;
    }

    function validarPresupuesto() {
        const presupuesto = parseFloat(document.getElementById('presupuestoFinal').textContent.replace('€', ''));
        const errors = [];
        
        if (isNaN(presupuesto) || presupuesto <= 0) {
            errors.push('El presupuesto final debe ser mayor a 0€.');
            displayErrors(errors);
            return false;
        }
        
        return true;
    }

    // Función para mostrar el presupuesto final
    function mostrarPresupuesto() {
        const presupuestoFinal = document.getElementById('presupuestoFinal').textContent;
        alert(`El presupuesto final es: ${presupuestoFinal}`);
        // Aquí puedes mostrar el presupuesto de manera más estilizada si lo deseas
    }
});
