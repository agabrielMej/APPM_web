import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  CATEGORIAS,
} from "../utils/categorias";

function CategoriasChart({
  items,
}) {
  const datos =
    CATEGORIAS.map(
      (categoria) => ({
        name:
          categoria.nombre,

        value:
          items.filter(
            (item) =>
              item.categoriaId ===
              categoria.id
          ).length,

        color:
          categoria.color,
      })
    ).filter(
      (categoria) =>
        categoria.value > 0
    );

  return (
    <div className="chart-card">
      <h2>
        Distribución por categoría
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={datos}
            dataKey="value"
            outerRadius={100}
            label
          >
            {datos.map(
              (
                categoria,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    categoria.color
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoriasChart;