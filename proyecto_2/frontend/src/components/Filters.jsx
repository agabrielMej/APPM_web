import { CATEGORIAS } from "../utils/categorias";

function Filters({
  estado,
  dispatch,
}) {
  return (
    <div className="filters-container">
      <div className="filters">
        <button
          className={
            estado.filtroCategoria ===
            "todas"
              ? "active-view"
              : ""
          }
          onClick={() =>
            dispatch({
              type: "FILTRAR",
              payload: {
                campo:
                  "filtroCategoria",
                valor: "todas",
              },
            })
          }
        >
          Todas
        </button>

        {CATEGORIAS.map(
          (categoria) => (
            <button
              key={categoria.id}
              className={
                estado.filtroCategoria ===
                categoria.id
                  ? "active-view"
                  : ""
              }
              onClick={() =>
                dispatch({
                  type: "FILTRAR",
                  payload: {
                    campo:
                      "filtroCategoria",
                    valor:
                      categoria.id,
                  },
                })
              }
            >
              {categoria.nombre}
            </button>
          )
        )}
      </div>

      <div className="filters">
        <select
          value={
            estado.filtroEstado
          }
          onChange={(e) =>
            dispatch({
              type: "FILTRAR",
              payload: {
                campo:
                  "filtroEstado",
                valor:
                  e.target.value,
              },
            })
          }
        >
          <option value="todos">
            Todos los estados
          </option>

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
          placeholder="Buscar sesiones..."
          className="search-input"
          value={estado.busqueda}
          onChange={(e) =>
            dispatch({
              type: "FILTRAR",
              payload: {
                campo:
                  "busqueda",
                valor:
                  e.target.value,
              },
            })
          }
        />

        <button
          onClick={() =>
            dispatch({
              type:
                "LIMPIAR_FILTROS",
            })
          }
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default Filters;