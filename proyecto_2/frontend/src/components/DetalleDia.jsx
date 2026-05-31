function DetalleDia({
  fecha,
  items,
}) {
  const sesiones =
    items.filter(
      (item) =>
        item.fechaRegistro.startsWith(
          fecha
        )
    );

  const minutos =
    sesiones.reduce(
      (total, item) =>
        total +
        (item.atributos
          ?.duracion || 0),
      0
    );

  return (
    <div className="day-detail">
      <h2>
        Detalle del día {fecha}
      </h2>

      <p>
        Sesiones:
        {" "}
        {sesiones.length}
      </p>

      <p>
        Minutos entrenados:
        {" "}
        {minutos}
      </p>

      <div className="activities">
        {sesiones.map(
          (item) => (
            <div
              key={item.id}
              className="activity-card"
            >
              <h3>
                {item.nombre}
              </h3>

              <p>
                {
                  item.categoriaId
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DetalleDia;