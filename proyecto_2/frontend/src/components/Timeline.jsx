import DayCard from "./DayCard";

function Timeline({ items }) {
  return (
    <main className="timeline">
      <DayCard items={items} />
    </main>
  );
}

export default Timeline;