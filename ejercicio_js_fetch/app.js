const habilidades = ["JavaScript", "CSS", "HTML", "APIs", "DOM"];

const mostrarEtiquetas = (lista) => {
    const contenedor = document.querySelector("#etiquetas");
    contenedor.innerHTML = ""; 

    lista.forEach((item) => {
        const span = document.createElement("span");
        span.classList.add("etiqueta");
        span.textContent = item;
        contenedor.appendChild(span);
    });
};

const construirPerfil = (datos) => {
    return {
        nombre: datos.name,
        usuario: "@" + datos.login,
        email: datos.email || "No disponible",
        ciudad: datos.location || "Sin ubicación",
        avatar: datos.avatar_url
    };
};

const renderizarPerfil = (perfil) => {
    document.querySelector("#nombre").textContent = perfil.nombre;
    document.querySelector("#usuario").textContent = perfil.usuario;
    document.querySelector("#email").textContent = perfil.email;
    document.querySelector("#ciudad").textContent = perfil.ciudad;
    document.querySelector("#avatar").src = perfil.avatar;
};

const cargarUsuarios = async () => {
    const mensaje = document.querySelector("#mensaje");

    try {
        mensaje.textContent = "Cargando...";

        const respuesta = await fetch("https://api.github.com/users");
        const data = await respuesta.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        const usuarioBase = data[randomIndex]; 

        const respuestaDetalle = await fetch(usuarioBase.url);
        const usuarioCompleto = await respuestaDetalle.json();
        
        const perfil = construirPerfil(usuarioCompleto);
        renderizarPerfil(perfil);

        mostrarEtiquetas(habilidades);

        mensaje.textContent = "";

    } catch (error) {
        mensaje.textContent = "Error al cargar usuario";
    }
};


document.querySelector("#btn").addEventListener("click", cargarUsuarios);