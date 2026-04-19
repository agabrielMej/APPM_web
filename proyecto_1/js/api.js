const F1_URL = "https://ergast.com/api/f1";

const BASE_URL = "https://dummyjson.com/posts";

export const getPosts = async () => {
    try {
        const res = await fetch("https://dummyjson.com/posts");
        const data = await res.json();

        const apiPosts = data.posts;

        // traer posts guardados
        const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

        return [...savedPosts, ...apiPosts];

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

// Obtener pilotos actuales
export const getDrivers = async () => {
    try {
        const res = await fetch("https://api.jolpi.ca/ergast/f1/current/drivers/");
        const data = await res.json();

        console.log("Drivers:", data);

        return data.MRData.DriverTable.Drivers;
    } catch (error) {
        console.error("Error F1:", error);
        return [];
    }
};

export const createPost = async (postData) => {
    try {
        const res = await fetch("https://dummyjson.com/posts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error creando post:", error);
        return null;
    }
};