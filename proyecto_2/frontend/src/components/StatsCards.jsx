import { useMemo } from "react";

function StatsCards({ items }) {
  const estadisticas =
    useMemo(() => {
      const completadas =
        items.filter(
          (item) =>
            item.estado ===
            "completado"
        ).length;

      const minutos =
        items.reduce(
          (acc, item) =>
            acc +
            (item.atributos
              ?.duracion || 0),
          0
        );

      const categorias =
        new Set(
          items.map(
            (item) =>
              item.categoriaId
          )
        ).size;

      const pendientes =
        items.filter(
          (item) =>
            item.estado ===
            "pendiente"
        ).length;

      return {
        completadas,
        minutos,
        categorias,
        pendientes,
      };
    }, [items]);

  return (
    <section className="stats-container">
      <div className="stat-card">
        <h3>
          Sesiones completadas
        </h3>

        <p>
          {
            estadisticas.completadas
          }
        </p>
      </div>

      <div className="stat-card">
        <h3>
          Minutos entrenados
        </h3>

        <p>
          {estadisticas.minutos}
        </p>
      </div>

      <div className="stat-card">
        <h3>
          Categorias activas
        </h3>

        <p>
          {
            estadisticas.categorias
          }
        </p>
      </div>

      <div className="stat-card">
        <h3>
          Sesiones pendientes
        </h3>

        <p>
          {
            estadisticas.pendientes
          }
        </p>
      </div>
    </section>
  );
}

export default StatsCards;