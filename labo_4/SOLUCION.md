# SOLUCION.md — Parte 1: Depuración de servidor-malo.js

---

### Error #1: Paréntesis de cierre faltante en `http.createServer`

**Ubicación:** Línea 35 del archivo original  
**Tipo de error:** Sintaxis  
**Qué estaba mal:**  
El callback pasado a `http.createServer(async (req, res) => { ... }` nunca se cerró con el paréntesis de cierre `)` correspondiente. El archivo termina con solo `}` cerrando la función anónima, pero le falta el `)` que cierra la llamada a `createServer`.

**Cómo lo corregí:**
```js
// Antes
const server = http.createServer(async (req, res) => {
  ...
}   // ← falta el paréntesis

// Después
const server = http.createServer(async (req, res) => {
  ...
})  // ← correcto
```

**Por qué funciona ahora:**  
JavaScript interpreta la llamada a `createServer(callback)` como una expresión que requiere que los paréntesis estén balanceados. Sin el `)` de cierre, Node.js lanza un `SyntaxError` y el servidor nunca puede iniciar.

---

### Error #2: Content-Type incorrecto en la ruta `/info`

**Ubicación:** Línea 14 del archivo original  
**Tipo de error:** HTTP / Protocolo  
**Qué estaba mal:**  
El header `Content-Type` tenía un guión en lugar de barra diagonal: `"application-json"` en vez de `"application/json"`. Esto hace que el cliente no sepa interpretar la respuesta como JSON.

**Cómo lo corregí:**
```js
// Antes
res.writeHead(200, { "Content-Type": "application-json" })

// Después
res.writeHead(200, { "Content-Type": "application/json" })
```

**Por qué funciona ahora:**  
El tipo MIME correcto es `application/json`. Con el guión, el header es inválido y los clientes (navegadores, Postman, fetch) no procesarán la respuesta como JSON.

---

### Error #3: Promesa sin `await` en `/api/student`

**Ubicación:** Línea 19 del archivo original  
**Tipo de error:** Asincronía / Lógica  
**Qué estaba mal:**  
`fs.readFile` es una función asíncrona que retorna una `Promise`. Al no usar `await`, la variable `texto` contiene el objeto `Promise` en vez del contenido del archivo. Al serializar eso con `JSON.stringify`, la respuesta es `{}` (un objeto vacío), no los datos del archivo.

**Cómo lo corregí:**
```js
// Antes
const texto = fs.readFile(filePath, "utf-8")
res.end(JSON.stringify(texto))  // serializa la Promise, no el contenido

// Después
const texto = await fs.readFile(filePath, "utf-8")
res.end(texto)  // texto ya es el string con el JSON del archivo
```

**Por qué funciona ahora:**  
Con `await`, la ejecución espera a que la promesa se resuelva y `texto` recibe el string con el contenido real del archivo. Además, como ya es un string JSON válido, no es necesario volver a envolverlo con `JSON.stringify`.

---

### Error #4: Código de estado 200 para ruta no encontrada

**Ubicación:** Línea 27 del archivo original  
**Tipo de error:** HTTP / Protocolo  
**Qué estaba mal:**  
Cuando ninguna ruta coincide, el servidor respondía con código `200 OK`. Semánticamente esto es incorrecto: el código 200 significa éxito, pero una ruta inexistente debería responder con `404 Not Found`.

**Cómo lo corregí:**
```js
// Antes
res.writeHead(200, { "Content-Type": "text/plain" })
res.end("Ruta no encontrada")

// Después
res.writeHead(404, { "Content-Type": "text/plain" })
res.end("Ruta no encontrada")
```

**Por qué funciona ahora:**  
El código HTTP 404 es el estándar para indicar que el recurso solicitado no existe en el servidor. Esto permite que los clientes y herramientas (como Postman o fetch) detecten correctamente el error.

---

### Error #5: Paréntesis de cierre faltante en `server.listen`

**Ubicación:** Línea 31 del archivo original  
**Tipo de error:** Sintaxis  
**Qué estaba mal:**  
La llamada `server.listen(PORT, () => { ... }` no tenía el paréntesis de cierre `)`. Igual que el Error #1, esto produce un `SyntaxError` que impide que el archivo se ejecute.

**Cómo lo corregí:**
```js
// Antes
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000")
}   // ← falta el paréntesis

// Después
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000")
})  // ← correcto
```

**Por qué funciona ahora:**  
Al balancear correctamente los paréntesis, Node.js puede parsear el archivo sin errores de sintaxis y el servidor queda escuchando en el puerto indicado.
