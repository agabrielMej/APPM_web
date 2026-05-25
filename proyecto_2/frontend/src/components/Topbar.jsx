function Topbar({
  view,
  setView,

  modo,
  setModo,

  tema,
  toggleTema,
}) {
  return (
    <nav className="topbar">
      <div className="logo">
        <h2>GymLog</h2>
      </div>

      <div className="view-buttons">
        <button
          className={
            view === "timeline"
              ? "active-view"
              : ""
          }

          onClick={() =>
            setView(
              "timeline"
            )
          }
        >
          Timeline
        </button>

        <button
          className={
            view === "calendar"
              ? "active-view"
              : ""
          }

          onClick={() =>
            setView(
              "calendar"
            )
          }
        >
          Calendario
        </button>

        <button
          className={
            modo === "local"
              ? "active-view"
              : ""
          }

          onClick={() =>
            setModo("local")
          }
        >
          Local
        </button>

        <button
          className={
            modo === "api"
              ? "active-view"
              : ""
          }

          onClick={() =>
            setModo("api")
          }
        >
          API
        </button>

        <button
          onClick={
            toggleTema
          }
        >
          {tema === "oscuro"
            ? "Claro"
            : "Oscuro"}
        </button>
      </div>
    </nav>
  );
}

export default Topbar;