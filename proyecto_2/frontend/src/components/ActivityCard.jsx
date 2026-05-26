import { useState } from "react";

import {
  CATEGORIAS,
} from "../utils/categorias";

function ActivityCard({
  item,
  eliminarItem,
  editarItem,
}) {
  const categoria =
    CATEGORIAS.find(
      (cat) =>
        cat.id === item.categoriaId
    );

  const [editando, setEditando] =
    useState(false);

  const [estado, setEstado] =
    useState(item.estado);

  const [notas, setNotas] =
    useState(item.notas);

  const guardarCambios = () => {
    editarItem(item.id, {
      estado,
      notas,
    });

    setEditando(false);
  };

  return (
    <article
      className={`activity-card ${item.categoriaId}`}
    >
      <div>
        <h3>{item.nombre}</h3>

        <p>
          Categoria:
          {" "}
          {categoria?.nombre}
        </p>

        <p>
          Fecha:
          {" "}
          {item.fechaRegistro.split(
            "T"
          )[0]}
        </p>

        <p>
          Duracion:
          {" "}
          {item.atributos.duracion}
          {" "}min
        </p>

        <p>
          Puntuacion:
          {" "}
          {item.puntuacion ??
            "Sin puntuacion"}
        </p>

        <p>
          Ejercicios:
          {" "}
          {item.atributos.ejercicios.join(
            ", "
          )}
        </p>

        {editando ? (
          <>
            <select
              value={estado}
              onChange={(e) =>
                setEstado(
                  e.target.value
                )
              }
            >
              <option value="pendiente">
                Pendiente
              </option>

              <option value="completado">
                Completado
              </option>

              <option value="incompleto">
                Incompleto
              </option>
            </select>

            <input
              type="text"
              value={notas}
              onChange={(e) =>
                setNotas(
                  e.target.value
                )
              }
            />

            <button
              className="save-btn"
              onClick={
                guardarCambios
              }
            >
              Guardar
            </button>
          </>
        ) : (
          <p>{item.notas}</p>
        )}
      </div>

      <div className="card-actions">
        <span
          className={`status ${estado}`}
        >
          {estado}
        </span>

        <button
          className="edit-btn"
          onClick={() =>
            setEditando(
              !editando
            )
          }
        >
          Editar
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            eliminarItem(item.id)
          }
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ActivityCard;