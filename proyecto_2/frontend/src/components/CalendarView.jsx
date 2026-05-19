function CalendarView() {
  const days = [
    { number: 12, active: true },
    { number: 13, active: false },
    { number: 14, active: true },
    { number: 15, active: false },
    { number: 16, active: true },
    { number: 17, active: false },
    { number: 18, active: true },
    { number: 19, active: true },
    { number: 20, active: false },
  ];

  return (
    <section className="calendar-view">
      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              day.active ? "active-day" : ""
            }`}
          >
            {day.number}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarView;