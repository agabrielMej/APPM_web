function ActivityCard({ title, category, status }) {
  return (
    <article className={`activity-card ${category}`}>
      <div>
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <span className={`status ${status}`}>
        {status}
      </span>
    </article>
  );
}

export default ActivityCard;