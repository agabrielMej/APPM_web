import {
  ResponsiveContainer,

  BarChart,
  Bar,

  XAxis,
  YAxis,

  Tooltip,
  Legend,
} from "recharts";

function ActivityChart({
  items,
}) {
  const datos = [];

  for (
    let i = 6;
    i >= 0;
    i--
  ) {
    const fecha =
      new Date();

    fecha.setDate(
      fecha.getDate() - i
    );

    const fechaISO =
      fecha
        .toISOString()
        .split("T")[0];

    const cantidad =
      items.filter(
        (item) =>
          item.fechaActividad?.startsWith(
            fechaISO
          )
      ).length;

    datos.push({
      fecha:
        fecha.toLocaleDateString(
          "es-ES",
          {
            day: "numeric",

            month:
              "short",
          }
        ),

      cantidad,
    });
  }

  return (
    <div className="chart-container">
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
            fill="var(--color-acento)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityChart;