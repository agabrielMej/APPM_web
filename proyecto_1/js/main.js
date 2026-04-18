import { getPosts, getDrivers } from "./api.js";
import { renderPosts, renderDrivers } from "./ui.js";
import { showDetail } from "./routes.js";
import { showHome } from "./routes.js";
import { showCreate } from "./routes.js";
import { showEdit, deletePostLocal } from "./routes.js";
import { showFavorites } from "./routes.js";
import { removeFavorite } from "./routes.js";
import { showInfo } from "./routes.js";
import { showDriverDetail } from "./routes.js";

let currentPage = 1;
const postsPerPage = 9;
let allPosts = [];


// Cargar POSTS
const loadPosts = async () => {
    allPosts = await getPosts();
    renderPaginatedPosts();
};

const renderPaginatedPosts = () => {

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const paginatedPosts = allPosts.slice(start, end);

    renderPosts(paginatedPosts);

    renderPaginationControls();
};

const renderPaginationControls = () => {

    let controls = document.getElementById("pagination");

    if (!controls) {
        controls = document.createElement("div");
        controls.id = "pagination";
        document.getElementById("posts-container").after(controls);
    }

    controls.innerHTML = `
        <button id="prev-page">⬅ Anterior</button>
        <span>Página ${currentPage}</span>
        <button id="next-page">Siguiente ➡</button>
    `;

    document.getElementById("prev-page").onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPaginatedPosts();
        }
    };

    document.getElementById("next-page").onclick = () => {
        if (currentPage * postsPerPage < allPosts.length) {
            currentPage++;
            renderPaginatedPosts();
        }
    };
};

// Cargar PILOTOS
const loadDrivers = async () => {
    const drivers = await getDrivers();
    console.log("Drivers:", drivers); // DEBUG
    renderDrivers(drivers);
};

// INICIALIZAR TODO
const init = async () => {
    await loadPosts();
};

init();

// BUSCADOR
document.getElementById("search").addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();

    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(text) ||
        post.body.toLowerCase().includes(text)
    );

    renderPosts(filtered);
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".detail-btn");
    const detailBtn = e.target.closest(".detail-btn");
    const editBtn = e.target.closest(".edit-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    const removeFavBtn = e.target.closest(".remove-fav");
    const favNavBtn = e.target.closest("#favorites-btn");
    const driverBtn = e.target.closest(".driver-detail-btn");

    if (btn) {
        const id = btn.dataset.id;
        showDetail(id);
    }

    if (detailBtn) {
        showDetail(detailBtn.dataset.id);
    }

    if (editBtn) {
        showEdit(editBtn.dataset.id);
    }

    if (deleteBtn) {
        deletePostLocal(deleteBtn.dataset.id);
    }

    if (favNavBtn) {
        showFavorites();
    }

    if (removeFavBtn) {
        removeFavorite(removeFavBtn.dataset.id);
    }

    if (driverBtn) {
        showDriverDetail(driverBtn.dataset.id);
    }
});


document.getElementById("home-btn").addEventListener("click", () => {
    showHome();
});


document.getElementById("create-btn").addEventListener("click", () => {
    showCreate();
});


document.addEventListener("click", (e) => {

    const infoBtn = e.target.closest("#info-btn");

    if (infoBtn) {
        showInfo();
    }

});

