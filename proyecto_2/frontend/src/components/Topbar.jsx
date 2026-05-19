function Topbar({ view, setView }) {
  return (
    <nav className="topbar">
      <div className="logo">
        <h2>LifeTracker</h2>
      </div>

      <div className="view-buttons">
        <button
          className={view === "timeline" ? "active-view" : ""}
          onClick={() => setView("timeline")}
        >
          Timeline
        </button>

        <button
          className={view === "calendar" ? "active-view" : ""}
          onClick={() => setView("calendar")}
        >
          Calendario
        </button>
      </div>
    </nav>
  );
}

export default Topbar;