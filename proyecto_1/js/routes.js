import { getPostById, getPosts, createPost } from "./api.js";
import { renderPostDetail, renderPosts } from "./ui.js";
export const showDetail = async (id) => {

    // buscar en localStorage primero
    const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

    const localPost = savedPosts.find(p => p.id == id);

    if (localPost) {
        renderPostDetail(localPost);

        document.getElementById("back-btn").addEventListener("click", async () => {
            const posts = await getPosts();
            renderPosts(posts);
        });

        return;
    }

    // si no está en local → usar API
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

export const deletePostLocal = (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este post?");
    if (!confirmDelete) return;

    let savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

    savedPosts = savedPosts.filter(post => post.id != id);

    localStorage.setItem("myPosts", JSON.stringify(savedPosts));

    showHome();
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
