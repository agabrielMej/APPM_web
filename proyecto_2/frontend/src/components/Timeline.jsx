import DayCard from "./DayCard";

function Timeline({
  items,
  eliminarItem,
}) {
  return (
    <main className="timeline">
      <DayCard
        items={items}
        eliminarItem={eliminarItem}
      />
    </main>
  );
}

export default Timeline;