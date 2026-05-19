import ActivityCard from "./ActivityCard";

function DayCard() {
  return (
    <section className="day-card">
      <h2>19 Mayo 2026</h2>

      <div className="activities">
        <ActivityCard
          title="Rutina pecho y triceps"
          category="gym"
          status="completado"
        />

        <ActivityCard
          title="Elden Ring"
          category="videojuegos"
          status="pendiente"
        />

        <ActivityCard
          title="Estudiar Backend"
          category="actividades"
          status="pendiente"
        />
      </div>
    </section>
  );
}

export default DayCard;