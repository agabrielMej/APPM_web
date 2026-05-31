import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function ActividadChart({
  items,
}) {
  const datos = Array.from(
    { length: 7 },
    (_, i) => {
      const fecha =
        new Date();

      fecha.setDate(
        fecha.getDate() -
          (6 - i)
      );

      const dia =
        fecha
          .toISOString()
          .split("T")[0];

      return {
        fecha:
          fecha.toLocaleDateString(
            "es-ES",
            {
              day: "numeric",
              month: "numeric",
            }
          ),

        cantidad:
          items.filter(
            (item) =>
              item.fechaActividad?.startsWith(
                dia
              )
          ).length,
      };
    }
  );

  return (
    <div className="chart-card">
      <h2>
        Actividad últimos 7 días
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={datos}>
          <XAxis
            dataKey="fecha"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="cantidad"
            name="Sesiones"
            fill="#818cf8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActividadChart;