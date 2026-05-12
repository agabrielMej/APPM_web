# Laboratorio 4 — JavaScript API

**Curso:** Sistemas y Tecnologías Web  
**Universidad del Valle de Guatemala**

---

## Descripción

Este laboratorio consta de dos partes:

1. **Depuración** de un servidor HTTP nativo con errores intencionales.
2. **Construcción** de una API REST completa con Express para gestionar un catálogo de videojuegos.

---

## Estructura del proyecto

```
labo_4/
├── servidor-malo.js        ← Archivo original (sin modificar)
├── servidor-corregido.js   ← Versión corregida (Parte 1)
├── datos.json              ← Datos para el servidor HTTP
├── api/
│   └── index.js            ← API con Express (Parte 2)
├── package.json
├── SOLUCION.md             ← Documentación de errores (Parte 1)
├── PRUEBAS.md              ← Evidencia de pruebas con Postman
├── screenshots/            ← Capturas de pantalla
└── README.md
```

---

## Instalación

```bash
npm install
```

---

## Ejecución

### Parte 1 — Servidor HTTP corregido (puerto 3000)
```bash
npm run servidor
```

### Parte 2 — API con Express (puerto 4000)
```bash
npm run api
```

---

## Endpoints de la API (Parte 2)

| Método | Ruta                  | Descripción                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/`                   | Bienvenida y lista de endpoints          |
| GET    | `/api/juegos`         | Listar todos (`?genero=` para filtrar)   |
| GET    | `/api/juegos/:id`     | Obtener un juego por id                  |
| POST   | `/api/juegos`         | Crear un nuevo juego                     |
| PUT    | `/api/juegos/:id`     | Reemplazar un juego completo             |
| PATCH  | `/api/juegos/:id`     | Actualizar campos específicos            |
| DELETE | `/api/juegos/:id`     | Eliminar un juego                        |

---

## Recurso: Videojuegos

Cada juego tiene las siguientes propiedades:

| Campo         | Tipo    | Descripción                        |
|---------------|---------|------------------------------------|
| `id`          | string  | UUID generado automáticamente      |
| `titulo`      | string  | Nombre del videojuego              |
| `genero`      | string  | Género (accion, aventura, etc.)    |
| `plataforma`  | string  | Plataforma donde se juega          |
| `anio`        | number  | Año de lanzamiento                 |
| `calificacion`| number  | Calificación del 1 al 10           |
| `multijugador`| boolean | Si tiene modo multijugador         |
