const express = require("express");

const router = express.Router();

const db =
  require("../db/database");

router.get("/", (req, res) => {
  db.all(
    `
    SELECT * FROM items
    WHERE activo = 1
  `,
    [],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({
            error: err.message,
          });
      }

      const items = rows.map(
        (item) => ({
          ...item,

          activo: Boolean(
            item.activo
          ),

          atributos: JSON.parse(
            item.atributos || "{}"
          ),
        })
      );

      res.json(items);
    }
  );
});

router.post("/", (req, res) => {
  const {
    nombre,
    categoriaId,
    estado,
    puntuacion,
    fechaRegistro,
    fechaActividad,
    notas,
    atributos,
  } = req.body;

  const nuevoItem = {
    id: crypto.randomUUID(),

    nombre,

    categoriaId,

    estado,

    puntuacion,

    fechaRegistro,

    fechaActividad,

    notas,

    atributos: JSON.stringify(
      atributos
    ),

    activo: 1,
  };

  db.run(
    `
    INSERT INTO items (
      id,
      nombre,
      categoriaId,
      estado,
      puntuacion,
      fechaRegistro,
      fechaActividad,
      notas,
      atributos,
      activo
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      nuevoItem.id,
      nuevoItem.nombre,
      nuevoItem.categoriaId,
      nuevoItem.estado,
      nuevoItem.puntuacion,
      nuevoItem.fechaRegistro,
      nuevoItem.fechaActividad,
      nuevoItem.notas,
      nuevoItem.atributos,
      nuevoItem.activo,
    ],

    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error: err.message,
          });
      }

      res.status(201).json({
        ...nuevoItem,

        activo: true,

        atributos:
          JSON.parse(
            nuevoItem.atributos
          ),
      });
    }
  );
});

router.put("/:id", (req, res) => {
  const {
    estado,
    notas,
  } = req.body;

  db.run(
    `
    UPDATE items

    SET
      estado = ?,
      notas = ?

    WHERE id = ?
  `,
    [
      estado,
      notas,
      req.params.id,
    ],

    function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error: err.message,
          });
      }

      res.json({
        mensaje:
          "Item actualizado",
      });
    }
  );
});

router.delete(
  "/:id",
  (req, res) => {
    db.run(
      `
      UPDATE items
      SET activo = 0
      WHERE id = ?
    `,
      [req.params.id],

      function (err) {
        if (err) {
          return res
            .status(500)
            .json({
              error: err.message,
            });
        }

        res.json({
          mensaje:
            "Item archivado",
        });
      }
    );
  }
);

router.post(
  "/:id/registro",
  (req, res) => {
    const {
      fecha,
      valor,
      notas,
    } = req.body;

    const nuevoRegistro = {
      id: crypto.randomUUID(),

      itemId: req.params.id,

      fecha,

      valor,

      notas,
    };

    db.run(
      `
      INSERT INTO registros (
        id,
        itemId,
        fecha,
        valor,
        notas
      )

      VALUES (?, ?, ?, ?, ?)
    `,
      [
        nuevoRegistro.id,
        nuevoRegistro.itemId,
        nuevoRegistro.fecha,
        nuevoRegistro.valor,
        nuevoRegistro.notas,
      ],

      function (err) {
        if (err) {
          return res
            .status(500)
            .json({
              error: err.message,
            });
        }

        res.status(201).json(
          nuevoRegistro
        );
      }
    );
  }
);

module.exports = router;