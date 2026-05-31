import ActividadChart from "./ActividadChart";
import CategoriasChart from "./CategoriasChart";
import MinutosCategoriaChart from "./MinutosCategoriaChart";

function ChartsDashboard({
  items,
}) {
  return (
    <section className="charts-dashboard">
      <ActividadChart
        items={items}
      />

      <CategoriasChart
        items={items}
      />

      <MinutosCategoriaChart
        items={items}
      />
    </section>
  );
}

export default ChartsDashboard;