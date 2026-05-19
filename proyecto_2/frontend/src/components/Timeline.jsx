import DayCard from "./DayCard";

function Timeline({
  items,
  eliminarItem,
  editarItem,
}) {
  return (
    <main className="timeline">
      <DayCard
        items={items}
        eliminarItem={eliminarItem}
        editarItem={editarItem}
      />
    </main>
  );
}

export default Timeline;