function ActivityCard({
  item,
  eliminarItem,
}) {
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
          Duracion:
          {" "}
          {item.atributos.duracion}
          {" "}min
        </p>

        <p>
          Puntuacion:
          {" "}
          {item.puntuacion ??
            "Sin puntuacion"}
        </p>

        <p>
          Ejercicios:
          {" "}
          {item.atributos.ejercicios.join(
            ", "
          )}
        </p>

        <p>{item.notas}</p>
      </div>

      <div className="card-actions">
        <span
          className={`status ${item.estado}`}
        >
          {item.estado}
        </span>

        <button
          className="delete-btn"
          onClick={() =>
            eliminarItem(item.id)
          }
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ActivityCard;