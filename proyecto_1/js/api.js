const BASE_URL = "https://dummyjson.com/posts";

export const getPosts = async () => {
    try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        return data.posts;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
export const getPostById = async (id) => {
    try {
        const res = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error obteniendo post:", error);
        return null;
    }
};