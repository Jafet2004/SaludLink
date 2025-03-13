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
        const nombre = document.getElementById('name').value;
        const edad = document.getElementById('age').value;
        const usuario = nombre; // Usa el nombre como usuario

        // Guardar en Local Storage, Session Storage y Cookies
        guardarLocalStorage('nombre', nombre);
        guardarSessionStorage('edad', edad);
        setCookie('usuario', usuario, 7);

        alert('Datos guardados: ' + nombre + ', ' + edad + ', ' + usuario);
    };

    // Manejador para el formulario de búsqueda
    document.getElementById('searchForm').onsubmit = function(event) {
        event.preventDefault(); // Evita el envío normal del formulario
        const cedula = document.getElementById('searchId').value;

        // Aquí puedes hacer lo que necesites con la cédula, como buscar en Local Storage
        const nombreGuardado = obtenerLocalStorage('nombre'); // Ejemplo de búsqueda
        if (cedula === nombreGuardado) {
            alert(`Usuario encontrado: ${nombreGuardado}`);
        } else {
            alert('Usuario no encontrado.');
        }
    };
});