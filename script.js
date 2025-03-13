// Funciones para Local Storage
function guardarLocalStorage(clave, valor) {
    localStorage.setItem(clave, valor);
}

function obtenerLocalStorage(clave) {
    return localStorage.getItem(clave);
}

// Funciones para Session Storage
function guardarSessionStorage(clave, valor) {
    sessionStorage.setItem(clave, valor);
}

function obtenerSessionStorage(clave) {
    return sessionStorage.getItem(clave);
}

// Funciones para Cookies
function setCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expires = "expires=" + fecha.toUTCString();
    document.cookie = `${nombre}=${valor}; ${expires}; path=/`;
}

function getCookie(nombre) {
    const nombreEQ = nombre + "=";
    const listaCookies = document.cookie.split(';');
    for (let i = 0; i < listaCookies.length; i++) {
        let c = listaCookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nombreEQ) === 0) return c.substring(nombreEQ.length, c.length);
    }
    return null;
}

// Ejemplo de uso
document.addEventListener('DOMContentLoaded', () => {
    // Manejador para el formulario de información
    document.getElementById('infoForm').onsubmit = function(event) {
        event.preventDefault(); // Evita el envío normal del formulario

        // Obtener todos los datos del formulario
        const nombre = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const age = document.getElementById('age').value;
        const birthplace = document.getElementById('birthplace').value;
        const cedula = document.getElementById('cedula').value;
        const address = document.getElementById('address').value;
        const emergency_contact = document.getElementById('emergency_contact').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const blood_type = document.getElementById('blood_type').value;
        const diseases = document.getElementById('diseases').value;
        const surgeries = document.getElementById('surgeries').value;
        const family_history = document.getElementById('family_history').value;
        const chronic_disease = document.getElementById('chronic_disease').value;
        const substances = document.getElementById('substances').value;
        const diet_exercise = document.getElementById('diet_exercise').value;
        const stress_mood = document.getElementById('stress_mood').value;
        const mental_treatment = document.getElementById('mental_treatment').value;
        const psicology = document.getElementById('psicology').value;

        // Guardar en Local Storage
        guardarLocalStorage('nombre', nombre);
        guardarLocalStorage('dob', dob);
        guardarLocalStorage('gender', gender);
        guardarLocalStorage('age', age);
        guardarLocalStorage('birthplace', birthplace);
        guardarLocalStorage('cedula', cedula);
        guardarLocalStorage('address', address);
        guardarLocalStorage('emergency_contact', emergency_contact);
        guardarLocalStorage('phone', phone);
        guardarLocalStorage('email', email);
        guardarLocalStorage('blood_type', blood_type);
        guardarLocalStorage('diseases', diseases);
        guardarLocalStorage('surgeries', surgeries);
        guardarLocalStorage('family_history', family_history);
        guardarLocalStorage('chronic_disease', chronic_disease);
        guardarLocalStorage('substances', substances);
        guardarLocalStorage('diet_exercise', diet_exercise);
        guardarLocalStorage('stress_mood', stress_mood);
        guardarLocalStorage('mental_treatment', mental_treatment);
        guardarLocalStorage('psicology', psicology);

        alert('Datos guardados correctamente.');
    };

    // Manejador para el formulario de búsqueda
    document.getElementById('searchForm').onsubmit = function(event) {
        event.preventDefault(); // Evita el envío normal del formulario
        const cedulaBuscada = document.getElementById('searchId').value;

        // Obtener la cédula guardada
        const cedulaGuardada = obtenerLocalStorage('cedula');

        // Elemento para mostrar resultados
        const searchResults = document.getElementById('searchResults');

        if (cedulaBuscada === cedulaGuardada) {
            // Mostrar información del usuario
            searchResults.innerHTML = `
                <h3>Información del Usuario:</h3>
                <p><strong>Nombre:</strong> ${obtenerLocalStorage('nombre')}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${obtenerLocalStorage('dob')}</p>
                <p><strong>Género:</strong> ${obtenerLocalStorage('gender')}</p>
                <p><strong>Edad:</strong> ${obtenerLocalStorage('age')}</p>
                <p><strong>Lugar de Nacimiento:</strong> ${obtenerLocalStorage('birthplace')}</p>
                <p><strong>Cédula:</strong> ${cedulaGuardada}</p>
                <p><strong>Dirección:</strong> ${obtenerLocalStorage('address')}</p>
                <p><strong>Contacto de Emergencia:</strong> ${obtenerLocalStorage('emergency_contact')}</p>
                <p><strong>Teléfono:</strong> ${obtenerLocalStorage('phone')}</p>
                <p><strong>Correo Electrónico:</strong> ${obtenerLocalStorage('email')}</p>
                <p><strong>Tipo de Sangre:</strong> ${obtenerLocalStorage('blood_type')}</p>
                <p><strong>Enfermedades:</strong> ${obtenerLocalStorage('diseases')}</p>
                <p><strong>Cirugías:</strong> ${obtenerLocalStorage('surgeries')}</p>
                <p><strong>Antecedentes:</strong> ${obtenerLocalStorage('family_history')}</p>
                <p><strong>Enfermedades Crónicas:</strong> ${obtenerLocalStorage('chronic_disease')}</p>
                <p><strong>Consumo de Sustancias:</strong> ${obtenerLocalStorage('substances')}</p>
                <p><strong>Hábitos de Alimentación:</strong> ${obtenerLocalStorage('diet_exercise')}</p>
                <p><strong>Manejo del Estrés:</strong> ${obtenerLocalStorage('stress_mood')}</p>
                <p><strong>Tratamiento Mental:</strong> ${obtenerLocalStorage('mental_treatment')}</p>
                <p><strong>Terapia:</strong> ${obtenerLocalStorage('psicology')}</p>
            `;
        } else {
            searchResults.innerHTML = '<p>Usuario no encontrado.</p>';
        }
    };
});