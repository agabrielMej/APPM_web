import { getPostById, getPosts, createPost } from "./api.js";
import { renderPostDetail, renderPosts } from "./ui.js";

export const showDetail = async (id) => {
    const post = await getPostById(id);
    renderPostDetail(post);

    document.getElementById("back-btn").addEventListener("click", async () => {
        const posts = await getPosts();
        renderPosts(posts);
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
            <h2>Crear publicación </h2>

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

        // VALIDACIÓN
        if (title.length < 5) {
            return showError("El título debe tener al menos 5 caracteres");
        }

        if (body.length < 20) {
            return showError("El contenido debe tener al menos 20 caracteres");
        }

        if (!author) {
            return showError("El autor es obligatorio");
        }

        const newPost = {
            title,
            body,
            userId: 1
        };

        const result = await createPost(newPost);

        if (result) {

        // agregar manualmente el post a la lista
        const newPost = {
            id: Date.now(),
            title,
            body
        };

    // guardar en localStorage
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

