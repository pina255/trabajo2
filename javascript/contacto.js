document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    
    form.addEventListener('submit', function(event) {
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const errorMessage = document.getElementById('error-checkbox');
        
        let formIsValid = true;

        // Validar el nombre
        const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
        if (!nombreRegex.test(nombre)) {
            alert('Por favor, ingresa un nombre válido (solo letras y espacios)');
            formIsValid = false;
        }

        // Validar el correo electrónico
        const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!correoRegex.test(correo)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            formIsValid = false;
        }

        // Validar que el mensaje no esté vacío
        if (mensaje === "") {
            alert('Por favor, escribe un mensaje.');
            formIsValid = false;
        }

        if (!formIsValid) {
            event.preventDefault(); // Evitar el envío del formulario si hay errores
        }
    });
});
