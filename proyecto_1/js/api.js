const BASE_URL = "https://dummyjson.com/posts";

// Obtener todos los posts
export const getPosts = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data.posts; // DummyJSON devuelve { posts: [] }
    } catch (error) {
        console.error("Error obteniendo posts:", error);
        return [];
    }
};