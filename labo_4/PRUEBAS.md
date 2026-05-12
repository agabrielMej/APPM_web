# PRUEBAS.md — Evidencia de Pruebas con Postman

> Reemplaza las secciones `[screenshot]` con capturas de pantalla de Postman.

---

## Parte 1 — servidor-corregido.js

### GET http://localhost:3000/
**Resultado esperado:** `200 OK` — `"Servidor activo"`  
[screenshot]

### GET http://localhost:3000/info
**Resultado esperado:** `200 OK` — JSON con mensaje  
[screenshot]

### GET http://localhost:3000/api/student
**Resultado esperado:** `200 OK` — contenido de `datos.json`  
[screenshot]

### GET http://localhost:3000/ruta-inexistente
**Resultado esperado:** `404 Not Found`  
[screenshot]

---

## Parte 2 — API con Express (puerto 4000)

### GET http://localhost:4000/
**Resultado esperado:** `200 OK` — lista de endpoints  
[screenshot]

### GET http://localhost:4000/api/juegos
**Resultado esperado:** `200 OK` — array con los 4 juegos iniciales  
[screenshot]

### GET http://localhost:4000/api/juegos?genero=accion
**Resultado esperado:** `200 OK` — solo juegos de género "accion"  
[screenshot]

### GET http://localhost:4000/api/juegos/:id (id válido)
**Resultado esperado:** `200 OK` — objeto del juego encontrado  
[screenshot]

### GET http://localhost:4000/api/juegos/id-inexistente
**Resultado esperado:** `404 Not Found`  
[screenshot]

### POST http://localhost:4000/api/juegos (body completo)
**Body:**
```json
{
  "titulo": "Celeste",
  "genero": "plataformas",
  "plataforma": "PC",
  "anio": 2018,
  "calificacion": 10,
  "multijugador": false
}
```
**Resultado esperado:** `201 Created` — objeto creado con id generado  
[screenshot]

### POST http://localhost:4000/api/juegos (body incompleto)
**Body:**
```json
{ "titulo": "Juego sin datos" }
```
**Resultado esperado:** `400 Bad Request` — mensaje indicando campos faltantes  
[screenshot]

### PUT http://localhost:4000/api/juegos/:id
**Resultado esperado:** `200 OK` — objeto completo reemplazado  
[screenshot]

### PATCH http://localhost:4000/api/juegos/:id
**Body:**
```json
{ "calificacion": 8 }
```
**Resultado esperado:** `200 OK` — objeto con solo ese campo actualizado  
[screenshot]

### DELETE http://localhost:4000/api/juegos/:id
**Resultado esperado:** `200 OK` — objeto eliminado  
[screenshot]

### GET http://localhost:4000/ruta-que-no-existe
**Resultado esperado:** `404` con JSON que incluye `ruta`, `metodo` y `sugerencia`  
[screenshot]
