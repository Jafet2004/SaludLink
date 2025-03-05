document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const cedula = document.getElementById("searchId").value;
    fetch(`https://tu-servidor.com/api/usuarios?cedula=${cedula}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Usuario no encontrado.");
                return;
            }
            // Llenar los campos del formulario con los datos obtenidos
            document.getElementById("name").value = data.name;
            document.getElementById("dob").value = data.dob;
            document.getElementById("gender").value = data.gender;
            document.getElementById("phone").value = data.phone;
            document.getElementById("email").value = data.email;
            document.getElementById("blood_type").value = data.blood_type;
            document.getElementById("diseases").value = data.diseases;
            document.getElementById("surgeries").value = data.surgeries;
            document.getElementById("family_history").value = data.family_history;
            document.getElementById("chronic_disease").value = data.chronic_disease;
            document.getElementById("substances").value = data.substances;
            document.getElementById("diet_exercise").value = data.diet_exercise;
            document.getElementById("stress_mood").value = data.stress_mood;
            document.getElementById("mental_treatment").value = data.mental_treatment;
            document.getElementById("therapy").value = data.therapy;
        })
        .catch(error => console.error("Error al obtener datos:", error));
});