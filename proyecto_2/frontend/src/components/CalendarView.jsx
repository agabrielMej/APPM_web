function CalendarView({
  items,
  setFechaSeleccionada,
}) {
  const dias = [
    ...new Set(
      items.map((item) =>
        item.fechaRegistro.split(
          "T"
        )[0]
      )
    ),
  ];

  return (
    <section className="calendar-view">
      <div className="calendar-grid">
        {dias.map((dia) => (
          <div
            key={dia}
            className="calendar-day active-day"
            onClick={() =>
              setFechaSeleccionada(
                dia
              )
            }
          >
            {dia}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarView;