let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

function mostrarPacientes() {
    const listaPacientes = document.getElementById("listaPacientes");
    listaPacientes.innerHTML = "";
    
    pacientes.forEach((paciente, index) => {
        const li = document.createElement("li");
        li.textContent = `Nº${index + 1}, Nombre: ${paciente.nombre}, Edad: ${paciente.edad}, Síntomas: ${paciente.sintomas.join(", ")}`;
        listaPacientes.appendChild(li);
    });
}

document.getElementById("pacienteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = parseInt(document.getElementById("edad").value.trim());
    const sintomas = document.getElementById("sintomas").value.trim().split(",").map(s => s.trim());

    if (!nombre || /[^a-zA-Z\s]/.test(nombre) || !apellido || /[^a-zA-Z\s]/.test(apellido) || isNaN(edad) || edad <= 0 || !sintomas.length) {
        alert("Por favor, complete correctamente los campos.");
        return;
    }

    const paciente = {
        nombre: nombre + " " + apellido,
        edad: edad,
        sintomas: sintomas
    };

    pacientes.push(paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    mostrarPacientes();
    document.getElementById("pacienteForm").reset();
    alert("Paciente registrado con éxito.");
});

function borrarPacientes() {
    if (confirm("¿Estás seguro de que quieres borrar todos los pacientes?")) {
        pacientes = [];
        localStorage.removeItem("pacientes");
        mostrarPacientes();
        alert("Lista de pacientes borrada.");
    }
}

mostrarPacientes();
document.getElementById("borrarBtn").addEventListener("click", borrarPacientes);