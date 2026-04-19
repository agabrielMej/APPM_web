export const validatePost = (title, body, author) => {

    if (!title || title.trim().length < 5) {
        return "El título debe tener al menos 5 caracteres";
    }

    if (!body || body.trim().length < 20) {
        return "El contenido debe tener al menos 20 caracteres";
    }

    if (!author || author.trim() === "") {
        return "El autor es obligatorio";
    }

    if (title.length > 100) {
    return "El título es demasiado largo";
    }
    
    if (body.length > 1000) {
    return "El contenido es demasiado largo";
}


    return null; // todo bien
};