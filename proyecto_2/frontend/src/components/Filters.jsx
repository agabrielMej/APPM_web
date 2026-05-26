import { CATEGORIAS } from "../utils/categorias";

function Filters({
  filtro,
  setFiltro,
}) {
  return (
    <div className="filters-container">
      <div className="filters">
        <button
          onClick={() =>
            setFiltro("todos")
          }
        >
          Todos
        </button>

        {CATEGORIAS.map(
          (categoria) => (
            <button
              key={categoria.id}

              onClick={() =>
                setFiltro(
                  categoria.id
                )
              }
            >
              {categoria.nombre}
            </button>
          )
        )}
      </div>

      <input
        type="text"
        placeholder="Buscar sesiones..."
        className="search-input"
      />
    </div>
  );
}

export default Filters;