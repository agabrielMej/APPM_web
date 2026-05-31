import { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import {
  CATEGORIAS,
} from "../utils/categorias";

function MinutosCategoriaChart({
  items,
}) {
  const datos =
    useMemo(() => {
      return CATEGORIAS.map(
        (categoria) => ({
          categoria:
            categoria.nombre,

          minutos:
            items
              .filter(
                (item) =>
                  item.categoriaId ===
                  categoria.id
              )
              .reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  (item
                    .atributos
                    ?.duracion ||
                    0),
                0
              ),
        })
      ).filter(
        (categoria) =>
          categoria.minutos > 0
      );
    }, [items]);

  return (
    <div className="chart-card">
      <h2>
        Minutos entrenados por categoría
      </h2>

      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <BarChart data={datos}>
          <XAxis
            dataKey="categoria"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="minutos"
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MinutosCategoriaChart;