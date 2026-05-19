function Header() {
  return (
    <header className="header">
      <h1>LifeTracker</h1>

      <input
        type="text"
        placeholder="Buscar actividades..."
        className="search-input"
      />
    </header>
  );
}

export default Header;