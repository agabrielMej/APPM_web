import { getPostById, getPosts, createPost } from "./api.js";
import { renderPostDetail, renderPosts } from "./ui.js";
import { validatePost } from "./validation.js";
import { getDrivers } from "./api.js";
import { renderDrivers } from "./ui.js";

export const showDetail = async (id) => {

    const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];
    let post = savedPosts.find(p => p.id == id);

    // si no está en local → usar API
    if (!post) {
        post = await getPostById(id);
    }

    renderPostDetail(post);

    document.getElementById("back-btn").addEventListener("click", async () => {
        const posts = await getPosts();
        renderPosts(posts);
    });

    //botón favorito
    document.getElementById("fav-btn").addEventListener("click", () => {

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const exists = favorites.find(p => p.id == post.id);

        if (exists) {
            alert("Ya está en favoritos");
            return;
        }

        favorites.push(post);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert("Agregado a favoritos ⭐");
    });
};


export const showHome = async () => {
    const container = document.getElementById("posts-container");

    container.innerHTML = "";

    const posts = await getPosts();
    renderPosts(posts);
};


export const showCreate = () => {
    const container = document.getElementById("posts-container");

    container.innerHTML = `
        <div class="form-container">
            <h2>Crear publicación</h2>

            <form id="create-form">
                <input type="text" id="title" placeholder="Título" />
                <textarea id="body" placeholder="Contenido"></textarea>
                <input type="text" id="author" placeholder="Autor" />

                <button type="submit">Publicar</button>
            </form>

            <p id="error-msg"></p>
        </div>
    `;

    const form = document.getElementById("create-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const body = document.getElementById("body").value.trim();
        const author = document.getElementById("author").value.trim();

        //VALIDACIÓN CENTRALIZADA
        const error = validatePost(title, body, author);

        if (error) {
            return showError(error);
        }

        const newPostData = {
            title,
            body,
            userId: 1
        };

        const result = await createPost(newPostData);

        if (result) {

            //GUARDAR LOCALMENTE
            const newPost = {
                id: Date.now(),
                title,
                body
            };

            const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];
            savedPosts.unshift(newPost);

            localStorage.setItem("myPosts", JSON.stringify(savedPosts));

            showHome();
        }
    });

    const showError = (msg) => {
        document.getElementById("error-msg").textContent = msg;
    };
    
};

export const showEdit = (id) => {
    const container = document.getElementById("posts-container");

    const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];
    const post = savedPosts.find(p => p.id == id);

    if (!post) return alert("Solo puedes editar posts creados");

    container.innerHTML = `
        <div class="form-container">
            <h2>Editar publicación</h2>

            <form id="edit-form">
                <input type="text" id="title" value="${post.title}" />
                <textarea id="body">${post.body}</textarea>

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    `;

    document.getElementById("edit-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const body = document.getElementById("body").value.trim();

        let savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

        savedPosts = savedPosts.map(p => {
            if (p.id == id) {
                return { ...p, title, body };
            }
            return p;
        });

        localStorage.setItem("myPosts", JSON.stringify(savedPosts));

        showHome();
    });
};

export const showFavorites = () => {
    const container = document.getElementById("posts-container");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        container.innerHTML = `
            <h2>No hay favoritos </h2>
        `;
        return;
    }

    container.innerHTML = `<h2>Mis favoritos ⭐</h2>`;

    renderPosts(favorites);
};

export const removeFavorite = (id) => {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(post => post.id != id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Eliminado de favoritos");
};

export const deletePostLocal = (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este post?");
    if (!confirmDelete) return;

    let savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

    savedPosts = savedPosts.filter(post => post.id != id);

    localStorage.setItem("myPosts", JSON.stringify(savedPosts));

    showHome();
};

export const showInfo = async () => {
    const container = document.getElementById("posts-container");

    container.innerHTML = `
        <h2>Pilotos actuales 🏎️</h2>
        <div id="drivers-container" class="grid"></div>
    `;

    const drivers = await getDrivers();
    renderDrivers(drivers);
};