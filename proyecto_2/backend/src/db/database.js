const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./database.sqlite",
  (err) => {
    if (err) {
      console.log(
        "Error conectando SQLite",
        err.message
      );
    } else {
      console.log(
        "SQLite conectado correctamente"
      );
    }
  }
);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,

      nombre TEXT NOT NULL,

      categoriaId TEXT NOT NULL,

      estado TEXT DEFAULT 'pendiente',

      puntuacion REAL,

      fechaRegistro TEXT NOT NULL,

      fechaActividad TEXT,

      notas TEXT DEFAULT '',

      atributos TEXT DEFAULT '{}',

      activo INTEGER DEFAULT 1
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id TEXT PRIMARY KEY,

      itemId TEXT NOT NULL,

      fecha TEXT NOT NULL,

      valor REAL NOT NULL,

      notas TEXT DEFAULT '',

      FOREIGN KEY (itemId)
      REFERENCES items(id)
    )
  `);
});

module.exports = db;