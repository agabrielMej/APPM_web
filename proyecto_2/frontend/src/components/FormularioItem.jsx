import { useState } from "react";

function FormularioItem({ addItem }) {
  const [nombre, setNombre] = useState("");

  const [categoriaId, setCategoriaId] =
    useState("fuerza");

  const [estado, setEstado] =
    useState("pendiente");

  const [puntuacion, setPuntuacion] =
    useState("");

  const [notas, setNotas] =
    useState("");

  const [duracion, setDuracion] =
    useState("");

  const [ejercicios, setEjercicios] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoItem = {
      id: crypto.randomUUID(),

      nombre,

      categoriaId,

      estado,

      puntuacion: puntuacion
        ? Number(puntuacion)
        : null,

      fechaRegistro: new Date().toISOString(),

      fechaActividad: new Date().toISOString(),

      notas,

      atributos: {
        duracion: Number(duracion),

        ejercicios: ejercicios
          .split(",")
          .map((e) => e.trim()),
      },

      activo: true,
    };

    addItem(nuevoItem);

    setNombre("");
    setCategoriaId("fuerza");
    setEstado("pendiente");
    setPuntuacion("");
    setNotas("");
    setDuracion("");
    setEjercicios("");
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la sesion"
        value={nombre}
        onChange={(e) =>
          setNombre(e.target.value)
        }
        required
      />

      <select
        value={categoriaId}
        onChange={(e) =>
          setCategoriaId(e.target.value)
        }
      >
        <option value="fuerza">
          Fuerza
        </option>

        <option value="cardio">
          Cardio
        </option>

        <option value="flexibilidad">
          Flexibilidad
        </option>

        <option value="deportes">
          Deportes
        </option>
      </select>

      <select
        value={estado}
        onChange={(e) =>
          setEstado(e.target.value)
        }
      >
        <option value="pendiente">
          Pendiente
        </option>

        <option value="completado">
          Completado
        </option>
      </select>

      <input
        type="number"
        placeholder="Puntuacion"
        value={puntuacion}
        onChange={(e) =>
          setPuntuacion(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Duracion"
        value={duracion}
        onChange={(e) =>
          setDuracion(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Ejercicios separados por coma"
        value={ejercicios}
        onChange={(e) =>
          setEjercicios(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Notas"
        value={notas}
        onChange={(e) =>
          setNotas(e.target.value)
        }
      />

      <button type="submit">
        Crear sesion
      </button>
    </form>
  );
}

export default FormularioItem;