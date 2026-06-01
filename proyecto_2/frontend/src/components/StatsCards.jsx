import {
  useProgresoEntrenamiento,
} from "../hooks/useProgresoEntrenamiento";

function StatsCards({
  items,
}) {
  const estadisticas =
    useProgresoEntrenamiento(
      items
    );

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