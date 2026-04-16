import { getPosts, getDrivers } from "./api.js";
import { renderPosts, renderDrivers } from "./ui.js";
import { showDetail } from "./routes.js";
import { showHome } from "./routes.js";

let allPosts = [];

// Cargar POSTS
const loadPosts = async () => {
    allPosts = await getPosts();
    console.log("Posts:", allPosts); // DEBUG
    renderPosts(allPosts);
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

    if (btn) {
        const id = btn.dataset.id;
        showDetail(id);
    }
});


document.getElementById("home-btn").addEventListener("click", () => {
    showHome();
});