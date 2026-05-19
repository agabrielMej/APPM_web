function StatsCards({ items }) {
  const completadas =
    items.filter(
      (item) =>
        item.estado === "completado"
    ).length;

  const minutos =
    items.reduce(
      (acc, item) =>
        acc +
        (item.atributos.duracion || 0),
      0
    );

  const categorias =
    new Set(
      items.map(
        (item) => item.categoriaId
      )
    ).size;

  const pendientes =
    items.filter(
      (item) =>
        item.estado === "pendiente"
    ).length;

  return (
    <section className="stats-container">
      <div className="stat-card">
        <h3>Sesiones completadas</h3>
        <p>{completadas}</p>
      </div>

      <div className="stat-card">
        <h3>Minutos entrenados</h3>
        <p>{minutos}</p>
      </div>

      <div className="stat-card">
        <h3>Categorias activas</h3>
        <p>{categorias}</p>
      </div>

      <div className="stat-card">
        <h3>Sesiones pendientes</h3>
        <p>{pendientes}</p>
      </div>
    </section>
  );
}

export default StatsCards;