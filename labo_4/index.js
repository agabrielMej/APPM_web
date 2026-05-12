import express from "express"
import { randomUUID } from "crypto"

const app = express()
const PORT = 4000

app.use(express.json())

// ──────────────────────────────────────────────
// DATOS INICIALES — recurso: Videojuegos
// ──────────────────────────────────────────────
let juegos = [
  {
    id: randomUUID(),
    titulo: "The Legend of Zelda: Breath of the Wild",
    genero: "aventura",
    plataforma: "Nintendo Switch",
    anio: 2017,
    calificacion: 10,
    multijugador: false,
  },
  {
    id: randomUUID(),
    titulo: "God of War",
    genero: "accion",
    plataforma: "PlayStation 4",
    anio: 2018,
    calificacion: 10,
    multijugador: false,
  },
  {
    id: randomUUID(),
    titulo: "Minecraft",
    genero: "sandbox",
    plataforma: "PC",
    anio: 2011,
    calificacion: 9,
    multijugador: true,
  },
  {
    id: randomUUID(),
    titulo: "Hollow Knight",
    genero: "plataformas",
    plataforma: "PC",
    anio: 2017,
    calificacion: 9,
    multijugador: false,
  },
]

// Campos obligatorios para crear un juego
const CAMPOS_REQUERIDOS = ["titulo", "genero", "plataforma", "anio", "calificacion", "multijugador"]

// ──────────────────────────────────────────────
// RUTAS INFORMATIVAS
// ──────────────────────────────────────────────

// GET /  — Bienvenida y lista de endpoints
app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    data: {
      mensaje: "API de Videojuegos — Laboratorio 4",
      endpoints: [
        "GET  /api/juegos            — Obtener todos (filtro: ?genero=accion)",
        "GET  /api/juegos/:id        — Obtener uno por id",
        "POST /api/juegos            — Crear nuevo juego",
        "PUT  /api/juegos/:id        — Reemplazar juego completo",
        "PATCH /api/juegos/:id       — Modificar campos específicos",
        "DELETE /api/juegos/:id      — Eliminar juego",
      ],
    },
  })
})

// ──────────────────────────────────────────────
// CRUD
// ──────────────────────────────────────────────

// GET /api/juegos — Listar todos; soporta ?genero=
app.get("/api/juegos", (req, res) => {
  const { genero } = req.query
  const resultado = genero
    ? juegos.filter((j) => j.genero.toLowerCase() === genero.toLowerCase())
    : juegos

  res.status(200).json({ ok: true, data: resultado })
})

// GET /api/juegos/:id — Obtener uno
app.get("/api/juegos/:id", (req, res) => {
  const juego = juegos.find((j) => j.id === req.params.id)
  if (!juego) {
    return res.status(404).json({ ok: false, error: `No se encontró ningún juego con id '${req.params.id}'` })
  }
  res.status(200).json({ ok: true, data: juego })
})

// POST /api/juegos — Crear
app.post("/api/juegos", (req, res) => {
  const body = req.body

  // Validación: verificar que todos los campos requeridos estén presentes
  const faltantes = CAMPOS_REQUERIDOS.filter((campo) => body[campo] === undefined)
  if (faltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`,
    })
  }

  const nuevoJuego = {
    id: randomUUID(),
    titulo: body.titulo,
    genero: body.genero,
    plataforma: body.plataforma,
    anio: body.anio,
    calificacion: body.calificacion,
    multijugador: body.multijugador,
  }

  juegos.push(nuevoJuego)
  res.status(201).json({ ok: true, data: nuevoJuego })
})

// PUT /api/juegos/:id — Reemplazar objeto completo
app.put("/api/juegos/:id", (req, res) => {
  const index = juegos.findIndex((j) => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: `No se encontró ningún juego con id '${req.params.id}'` })
  }

  const body = req.body
  const faltantes = CAMPOS_REQUERIDOS.filter((campo) => body[campo] === undefined)
  if (faltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      error: `Para PUT debes enviar todos los campos. Faltan: ${faltantes.join(", ")}`,
    })
  }

  const juegoActualizado = {
    id: req.params.id, // conservamos el mismo id
    titulo: body.titulo,
    genero: body.genero,
    plataforma: body.plataforma,
    anio: body.anio,
    calificacion: body.calificacion,
    multijugador: body.multijugador,
  }

  juegos[index] = juegoActualizado
  res.status(200).json({ ok: true, data: juegoActualizado })
})

// PATCH /api/juegos/:id — Actualizar solo los campos enviados
app.patch("/api/juegos/:id", (req, res) => {
  const index = juegos.findIndex((j) => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: `No se encontró ningún juego con id '${req.params.id}'` })
  }

  // Mezclamos el juego existente con los campos nuevos
  const juegoActualizado = { ...juegos[index], ...req.body, id: req.params.id }
  juegos[index] = juegoActualizado
  res.status(200).json({ ok: true, data: juegoActualizado })
})

// DELETE /api/juegos/:id — Eliminar
app.delete("/api/juegos/:id", (req, res) => {
  const index = juegos.findIndex((j) => j.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ ok: false, error: `No se encontró ningún juego con id '${req.params.id}'` })
  }

  const eliminado = juegos.splice(index, 1)[0]
  res.status(200).json({ ok: true, data: eliminado })
})

// ──────────────────────────────────────────────
// RUTA 404 — Debe ir al final
// ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    ruta: req.url,
    metodo: req.method,
    sugerencia: "Visita / para ver los endpoints disponibles",
  })
})

// ──────────────────────────────────────────────
// INICIAR SERVIDOR
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`API de Videojuegos corriendo en http://localhost:${PORT}`)
})
