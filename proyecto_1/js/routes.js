import { getPostById, getPosts, createPost } from "./api.js";
import { renderPostDetail, renderPosts } from "./ui.js";
import { validatePost } from "./validation.js";
import { getDrivers } from "./api.js";
import { renderDrivers } from "./ui.js";

export const showDetail = async (id) => {

    const savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];
    let post = savedPosts.find(p => p.id == id);

    // si no está en local → usar API
    if (!post) {
        post = await getPostById(id);
    }

    renderPostDetail(post);

    document.getElementById("back-btn").addEventListener("click", async () => {
        const posts = await getPosts();
        renderPosts(posts);
    });

    //botón favorito
    document.getElementById("fav-btn").addEventListener("click", () => {

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const exists = favorites.find(p => p.id == post.id);

        if (exists) {
            alert("Ya está en favoritos");
            return;
        }

        favorites.push(post);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert("Agregado a favoritos ⭐");
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
            <h2>Crear publicación</h2>

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

        //VALIDACIÓN CENTRALIZADA
        const error = validatePost(title, body, author);

        if (error) {
            return showError(error);
        }

        const newPostData = {
            title,
            body,
            userId: 1
        };

        const result = await createPost(newPostData);

        if (result) {

            //GUARDAR LOCALMENTE
            const newPost = {
                id: Date.now(),
                title,
                body
            };

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

export const showFavorites = () => {
    const container = document.getElementById("posts-container");

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        container.innerHTML = `
            <h2>No hay favoritos </h2>
        `;
        return;
    }

    container.innerHTML = `<h2>Mis favoritos ⭐</h2>`;

    renderPosts(favorites);
};

export const removeFavorite = (id) => {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(post => post.id != id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Eliminado de favoritos");
};

export const deletePostLocal = (id) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este post?");
    if (!confirmDelete) return;

    let savedPosts = JSON.parse(localStorage.getItem("myPosts")) || [];

    savedPosts = savedPosts.filter(post => post.id != id);

    localStorage.setItem("myPosts", JSON.stringify(savedPosts));

    showHome();
};

export const showInfo = async () => {
    const container = document.getElementById("posts-container");

    container.innerHTML = `
        <h2>Pilotos actuales </h2>
        <div id="drivers-container" class="grid"></div>
    `;

    const drivers = await getDrivers();
    renderDrivers(drivers);
};
export const showDriverDetail = async (driverId) => {
    const container = document.getElementById("posts-container");

    const drivers = await getDrivers();
    const driver = drivers.find(d => d.driverId === driverId);

    // info extra
    const driverExtraInfo = {
    "hamilton": {
        team: "Mercedes",
        number: 44,
        championships: 7,
        description: "Lewis Hamilton es uno de los pilotos más exitosos en la historia de la Fórmula 1, reconocido por su consistencia, velocidad y capacidad para romper récords, ha conseguido 7 campeonatos mundiales de pilotos con McLaren y Mercedes, acumulando más de 100 victorias y más de 190 podios a lo largo de su carrera, su primera victoria fue en el Gran Premio de Canadá 2007 con McLaren, ha sido pieza clave en la era dominante de Mercedes donde el equipo logró múltiples campeonatos de constructores, y a lo largo de su trayectoria ha competido con McLaren y Mercedes consolidándose como una leyenda del deporte"
    },
    "verstappen": {
        team: "Red Bull",
        number: 1,
        championships: 3,
        description: "Max Verstappen es conocido por su estilo agresivo y dominio en la era moderna de la Fórmula 1, ha ganado múltiples campeonatos mundiales de pilotos con Red Bull Racing, acumulando más de 50 victorias y numerosos podios, su primera victoria fue en el Gran Premio de España 2016 con Red Bull convirtiéndose en el piloto más joven en ganar una carrera, ha sido fundamental en los campeonatos de constructores recientes de Red Bull, y ha competido principalmente con Toro Rosso y Red Bull Racing consolidándose como uno de los pilotos más dominantes de su generación"
    },
    "alonso": {
        team: "Aston Martin",
        number: 14,
        championships: 2,
        description: "Fernando Alonso es reconocido por su inteligencia estratégica y habilidad en pista, logrando 2 campeonatos mundiales de pilotos con Renault en 2005 y 2006, cuenta con más de 30 victorias y más de 100 podios, su primera victoria fue en el Gran Premio de Hungría 2003 con Renault, ha competido con equipos como Minardi, Renault, McLaren, Ferrari, Alpine y Aston Martin, siendo clave en el éxito de Renault en campeonatos de constructores durante su etapa más dominante"
    },
    "leclerc": {
        team: "Ferrari",
        number: 16,
        championships: 0,
        description: "Charles Leclerc es conocido por su velocidad en clasificación y liderazgo dentro de Ferrari, aún sin campeonatos mundiales pero con múltiples victorias y podios, su primera victoria fue en el Gran Premio de Bélgica 2019 con Ferrari, ha competido con Sauber y Ferrari, siendo una pieza clave en el desarrollo del equipo en los últimos años aunque sin lograr campeonatos de constructores hasta el momento"
    },
    "sainz": {
        team: "Ferrari",
        number: 55,
        championships: 0,
        description: "Carlos Sainz Jr. es reconocido por su consistencia y capacidad de adaptación en diferentes equipos, ha logrado varias victorias y numerosos podios en su carrera, su primera victoria fue en el Gran Premio de Gran Bretaña 2022 con Ferrari, ha competido con Toro Rosso, Renault, McLaren y Ferrari, contribuyendo al desarrollo competitivo de cada equipo aunque sin campeonatos de pilotos ni de constructores"
    },
    "norris": {
        team: "McLaren",
        number: 4,
        championships: 0,
        description: "Lando Norris es conocido por su talento joven y constancia en pista, ha conseguido múltiples podios y su primera victoria llegó en el Gran Premio de Miami 2024 con McLaren, ha competido únicamente con McLaren en Fórmula 1 y ha sido clave en la recuperación competitiva del equipo, aunque aún no ha conseguido campeonatos de pilotos ni de constructores"
    },
    "piastri": {
        team: "McLaren",
        number: 81,
        championships: 0,
        description: "Oscar Piastri es un joven talento destacado por su rápida adaptación a la Fórmula 1 tras ser campeón en categorías inferiores, ha conseguido podios en sus primeras temporadas y su primera victoria fue en el Gran Premio de Hungría 2024 con McLaren, ha competido con McLaren y es considerado una de las promesas más fuertes del deporte aunque aún no cuenta con campeonatos"
    },
    "russell": {
        team: "Mercedes",
        number: 63,
        championships: 0,
        description: "George Russell es conocido por su consistencia y talento técnico, ha logrado victorias y podios importantes en su carrera, su primera victoria fue en el Gran Premio de Brasil 2022 con Mercedes, ha competido con Williams y Mercedes, siendo parte del equipo en una etapa de transición sin campeonatos recientes pero con potencial de futuro"
    },
    "gasly": {
        team: "Alpine",
        number: 10,
        championships: 0,
        description: "Pierre Gasly es reconocido por su resiliencia y capacidad de recuperación tras momentos difíciles, ha conseguido una victoria histórica en el Gran Premio de Italia 2020 con AlphaTauri y varios podios, ha competido con Toro Rosso, Red Bull, AlphaTauri y Alpine, siendo parte de equipos sin campeonatos recientes pero destacando individualmente"
    },
    "ocon": {
        team: "Alpine",
        number: 31,
        championships: 0,
        description: "Esteban Ocon es conocido por su consistencia y trabajo en equipo, ha logrado una victoria en el Gran Premio de Hungría 2021 con Alpine y varios podios, ha competido con Manor, Force India, Renault, Alpine y Mercedes como piloto reserva, siendo parte de equipos sin campeonatos recientes"
    },
    "bottas": {
        team: "Kick Sauber",
        number: 77,
        championships: 0,
        description: "Valtteri Bottas es reconocido por su rol como piloto clave en Mercedes durante su era dominante, ha conseguido múltiples victorias y más de 60 podios, su primera victoria fue en el Gran Premio de Rusia 2017 con Mercedes, ha competido con Williams, Mercedes y Sauber, contribuyendo directamente a varios campeonatos de constructores con Mercedes"
    },
    "tsunoda": {
        team: "RB (Visa Cash App)",
        number: 22,
        championships: 0,
        description: "Yuki Tsunoda es conocido por su estilo agresivo y evolución constante, ha conseguido algunos puntos importantes pero sin victorias aún, ha competido con AlphaTauri y RB, siendo parte de equipos en desarrollo sin campeonatos recientes"
    },
    "albon": {
        team: "Williams",
        number: 23,
        championships: 0,
        description: "Alexander Albon es reconocido por su habilidad para maximizar resultados con equipos de menor rendimiento, ha conseguido podios con Red Bull pero sin victorias, ha competido con Toro Rosso, Red Bull y Williams, contribuyendo al crecimiento del equipo aunque sin campeonatos"
    },
    "stroll": {
        team: "Aston Martin",
        number: 18,
        championships: 0,
        description: "Lance Stroll es conocido por su capacidad para aprovechar oportunidades en condiciones cambiantes, ha conseguido podios pero sin victorias, ha competido con Williams, Racing Point y Aston Martin, siendo parte de proyectos en crecimiento sin campeonatos"
    },
    "hulkenberg": {
        team: "Haas",
        number: 27,
        championships: 0,
        description: "Nico Hulkenberg es reconocido por su experiencia y consistencia a lo largo de su carrera, aunque nunca ha logrado una victoria en Fórmula 1 ha conseguido buenos resultados, ha competido con Williams, Force India, Renault, Haas y Sauber, siendo un piloto sólido sin campeonatos"
    },
    "magnussen": {
        team: "Haas",
        number: 20,
        championships: 0,
        description: "Kevin Magnussen es conocido por su estilo agresivo y competitivo, ha conseguido podios pero sin victorias, debutó con un podio en Australia 2014 con McLaren, ha competido con McLaren, Renault y Haas, siendo parte de equipos sin campeonatos recientes"
    }
    };

    const extra = driverExtraInfo[driverId] || {};

    container.innerHTML = `
        <div class="detail-card">
            <h2>${driver.givenName} ${driver.familyName}</h2>

            <p>Nacionalidad: ${driver.nationality}</p>
            <p>Fecha de nacimiento: ${driver.dateOfBirth}</p>

            <p>Equipo: ${extra.team || "Desconocido"}</p>
            <p>Número: ${extra.number || "N/A"}</p>
            <p>Campeonatos: ${extra.championships || 0}</p>

            <p>${extra.description || "Sin descripción disponible."}</p>

            <button id="back-btn">⬅ Volver</button>
        </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
        showInfo();
    });
};
