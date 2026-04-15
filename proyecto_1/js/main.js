import { getPosts } from "./api.js";
import { renderPosts } from "./ui.js";
import { showDetail } from "./routes.js";

let allPosts = [];

const init = async () => {
    allPosts = await getPosts();
    renderPosts(allPosts);
};

init();

// 🔍 BUSCADOR
document.getElementById("search").addEventListener("input", (e) => {
    const text = e.target.value.toLowerCase();

    const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(text) ||
        post.body.toLowerCase().includes(text)
    );

    renderPosts(filtered);
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("detail-btn")) {
        const id = e.target.dataset.id;
        showDetail(id);
    }
});