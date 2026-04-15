export const renderPosts = (posts) => {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body.substring(0, 100)}...</p>
            <button class="detail-btn" data-id="${post.id}">
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

            <button id="back-btn">⬅ Volver</button>
        </div>
    `;
};