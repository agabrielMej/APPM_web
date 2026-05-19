import ActivityCard from "./ActivityCard";

function DayCard({
  items,
  eliminarItem,
}) {
  return (
    <section className="day-card">
      <h2>Sesiones recientes</h2>

      <div className="activities">
        {items.map((item) => (
          <ActivityCard
            key={item.id}
            item={item}
            eliminarItem={eliminarItem}
          />
        ))}
      </div>
    </section>
  );
}

export default DayCard;