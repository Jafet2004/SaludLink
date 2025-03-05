document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const cedula = document.getElementById("searchId").value;
    const regex = /^[0-9]{3}-[0-9]{6}-[0-9]{4}[A-Z]{1}$/;

    if (!regex.test(cedula)) {
        alert("Por favor, ingresa una cédula válida en el formato Ej: 001-234567-8901X");
        return;
    }

    fetch(`http://127.0.0.1:5000/search/${cedula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById("searchResults");
            if (data.status === "not found") {
                resultsDiv.innerHTML = `<p style="color: red;">Usuario no encontrado.</p>`;
            } else {
                const user = data.user;
                resultsDiv.innerHTML = `
                    <h3>Datos del Usuario</h3>
                    <ul>
                        <li><strong>Nombre:</strong> ${user.name}</li>
                        <li><strong>Fecha de Nacimiento:</strong> ${user.dob}</li>
                        <li><strong>Género:</strong> ${user.gender}</li>
                        <li><strong>Teléfono:</strong> ${user.phone}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                    </ul>
                `;
            }
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
            document.getElementById("searchResults").innerHTML = `
                <p style="color: red;">Error al conectarse con el servidor. Inténtalo más tarde.</p>
            `;
        });
});
