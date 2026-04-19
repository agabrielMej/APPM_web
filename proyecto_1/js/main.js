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
let originalPosts = [];
let currentView = "home";

// Cargar POSTS
const loadPosts = async () => {
    const posts = await getPosts();

    originalPosts = posts;
    allPosts = posts;

    currentView = "home"; 

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
    if (currentView !== "home") return;

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
    currentView = "info";
    showInfo();
}

});

const applyFilters = () => {

    let filtered = [...originalPosts];

    const searchText = document.getElementById("search").value.toLowerCase();
    const typeFilter = document.getElementById("filter-type").value;
    const lengthFilter = document.getElementById("filter-length").value;

    //BÚSQUEDA
    if (searchText) {
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchText) ||
            post.body.toLowerCase().includes(searchText)
        );
    }

    // MIS POSTS / API
    const myPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

    if (typeFilter === "mine") {
        filtered = filtered.filter(post =>
            myPosts.some(p => p.id == post.id)
        );
    }

    if (typeFilter === "api") {
        filtered = filtered.filter(post =>
            !myPosts.some(p => p.id == post.id)
        );
    }

    // LONGITUD
    if (lengthFilter === "short") {
        filtered = filtered.filter(post => post.body.length < 100);
    }

    if (lengthFilter === "long") {
        filtered = filtered.filter(post => post.body.length >= 100);
    }

    // aplicar paginación
    allPosts = filtered;
    currentPage = 1;
    renderPaginatedPosts();
};

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("filter-type").addEventListener("change", applyFilters);
document.getElementById("filter-length").addEventListener("change", applyFilters);

const showFilters = () => {
    const filters = document.getElementById("filters");
    if (filters) filters.style.display = "flex";
};

const hideFilters = () => {
    const filters = document.getElementById("filters");
    if (filters) filters.style.display = "none";
};