function ActivityCard({ item }) {
  return (
    <article
      className={`activity-card ${item.categoriaId}`}
    >
      <div>
        <h3>{item.nombre}</h3>

        <p>
          Categoria: {item.categoriaId}
        </p>

        <p>
          Duracion:{" "}
          {item.atributos.duracion} min
        </p>

        <p>
          Puntuacion:{" "}
          {item.puntuacion ?? "Sin puntuacion"}
        </p>

        <p>
          Ejercicios:
          {" "}
          {item.atributos.ejercicios.join(", ")}
        </p>

        <p>
          {item.notas}
        </p>
      </div>

      <span
        className={`status ${item.estado}`}
      >
        {item.estado}
      </span>
    </article>
  );
}

export default ActivityCard;