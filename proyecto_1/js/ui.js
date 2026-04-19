export const renderPosts = (posts) => {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${(post.body || "").substring(0, 100)}...</p>

            <div class="post-buttons">
                <button class="detail-btn" data-id="${post.id}">
                    Ver más
                </button>

                <button class="edit-btn" data-id="${post.id}">
                    Editar
                </button>

                <button class="delete-btn" data-id="${post.id}">
                    Eliminar
                </button>
            </div>
        `;
        container.appendChild(card);
    });
};

export const renderDrivers = (drivers) => {
    const container = document.getElementById("drivers-container");
    container.innerHTML = "";

    drivers.forEach(driver => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${driver.givenName} ${driver.familyName}</h3>
            <p>${driver.nationality}</p>

            <button class="driver-detail-btn" data-id="${driver.driverId}">
                Ver más
            </button>
        `;

        container.appendChild(card);
    });
};

export const showMessage = (msg) => {
    const div = document.getElementById("message");
    div.textContent = msg;

    setTimeout(() => {
        div.textContent = "";
    }, 3000);
};
export const renderPostDetail = (post) => {
    const container = document.getElementById("posts-container");

    container.innerHTML = `
        <div class="detail-card">
            <h2>${post.title}</h2>
            <p>${post.body}</p>

            <div class="detail-buttons">
                <button id="back-btn">Volver</button>
                <button id="fav-btn">Favorito</button>
                    <button class="remove-fav" data-id="${post.id}">
                    Quitar
                    </button>
            </div>
        </div>
    `;
};

// Traducción simple (simulada)
const traducirTexto = (texto) => {
    return texto
        .replace(/the/gi, "el")
        .replace(/and/gi, "y")
        .replace(/is/gi, "es")
        .replace(/was/gi, "era")
        .replace(/to/gi, "a")
        .replace(/of/gi, "de")
        .replace(/in/gi, "en");
};

export const showDriverDetail = async (driverId) => {
    const container = document.getElementById("posts-container");

    const drivers = await getDrivers();
    const driver = drivers.find(d => d.driverId === driverId);

    container.innerHTML = `
        <div class="detail-card">
            <h2>${driver.givenName} ${driver.familyName}</h2>
            <p>Nacionalidad: ${driver.nationality}</p>
            <p>Fecha de nacimiento: ${driver.dateOfBirth}</p>

            <button id="back-btn">⬅ Volver</button>
        </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
        showInfo();
    });
};