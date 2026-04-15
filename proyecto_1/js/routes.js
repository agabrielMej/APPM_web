import { getPostById, getPosts } from "./api.js";
import { renderPostDetail, renderPosts } from "./ui.js";

export const showDetail = async (id) => {
    const post = await getPostById(id);
    renderPostDetail(post);

    document.getElementById("back-btn").addEventListener("click", async () => {
        const posts = await getPosts();
        renderPosts(posts);
    });
};