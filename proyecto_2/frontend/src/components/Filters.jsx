function Filters() {
  return (
    <div className="filters-container">
      <div className="filters">
        <button>Todos</button>
        <button>Fuerza</button>
        <button>Cardio</button>
        <button>Flexibilidad</button>
        <button>Deportes</button>
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