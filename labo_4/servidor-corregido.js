import http from "http"
import fs from "fs/promises"
import path from "path"

const PORT = 3000

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Servidor activo")
    return
  }

  // ERROR #2 corregido: "application-json" → "application/json"
  if (req.url === "/info") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ mensaje: "Ruta de información" }))
    return
  }

  if (req.url === "/api/student") {
    const filePath = path.join(process.cwd(), "datos.json")
    // ERROR #3 corregido: faltaba await antes de fs.readFile
    const texto = await fs.readFile(filePath, "utf-8")
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(texto)
    return
  }

  // ERROR #4 corregido: código de estado debe ser 404 para ruta no encontrada
  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("Ruta no encontrada")
// ERROR #1 corregido: faltaba el paréntesis de cierre ")" en createServer
})

// ERROR #5 corregido: faltaba el paréntesis de cierre ")" en server.listen
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})
