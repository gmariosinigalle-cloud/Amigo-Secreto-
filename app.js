// ======================
// Variables globales
// ======================
let amigos = [];

// ======================
// Listeners
// ======================
document.getElementById("amigo").addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        agregarAmigo();
    }
});

// ======================
// Funciones principales
// ======================
function agregarAmigo() {
    const nombre = obtenerNombre();
    if (!validarNombre(nombre)) return;

    amigos.push(nombre);
    mostrarListaAmigos();
    limpiarInput();
    limpiarResultado();
}

function mostrarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map((amigo, i) =>
        `<li>${amigo} <button class="boton-eliminar" aria-label="Eliminar ${amigo}" onclick="eliminarAmigo(${i})">❎</button></li>`
    ).join('');
    actualizarContador();
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");

    if (amigos.length === 0) {
        resultado.innerHTML = "<li>¡Ya se han sorteado todos los amigos!</li>";
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos.splice(indice, 1)[0];

    resultado.innerHTML = `<li>🎁 ${amigoSorteado} ! </li>`;
    actualizarContador();
}

// ======================
// Funciones auxiliares
// ======================
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarListaAmigos();
}

function reiniciarLista() {
    amigos = [];
    mostrarListaAmigos();
    limpiarResultado();
    limpiarInput();
}

function limpiarInput() {
    const input = document.getElementById('amigo');
    input.value = '';
    input.focus();
}

function limpiarResultado() {
    document.getElementById("resultado").innerHTML = "";
}

function actualizarContador() {
    document.getElementById("contadorAmigos").textContent = `Amigos en la lista: ${amigos.length}`;
}

function obtenerNombre() {
    return document.getElementById('amigo').value.trim();
}

function validarNombre(nombre) {
    if (nombre === "") {
        alert('Por favor, inserte un nombre válido');
        return false;
    }
    if (amigos.includes(nombre)) {
        alert('Tu amigo ya está incluido en la lista, favor de agregar uno diferente');
        return false;
    }
    return true;
}