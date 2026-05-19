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

        <button
          onClick={() =>
            setFiltro("fuerza")
          }
        >
          Fuerza
        </button>

        <button
          onClick={() =>
            setFiltro("cardio")
          }
        >
          Cardio
        </button>

        <button
          onClick={() =>
            setFiltro("flexibilidad")
          }
        >
          Flexibilidad
        </button>

        <button
          onClick={() =>
            setFiltro("deportes")
          }
        >
          Deportes
        </button>
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