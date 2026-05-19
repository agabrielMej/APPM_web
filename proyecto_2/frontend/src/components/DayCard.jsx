import ActivityCard from "./ActivityCard";

function DayCard({ items }) {
  return (
    <section className="day-card">
      <h2>Sesiones recientes</h2>

      <div className="activities">
        {items.map((item) => (
          <ActivityCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}

export default DayCard;