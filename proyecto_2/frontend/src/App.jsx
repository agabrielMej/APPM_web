import { useEffect, useState } from "react";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import Timeline from "./components/Timeline";
import CalendarView from "./components/CalendarView";
import FormularioItem from "./components/FormularioItem";

function App() {
  const [view, setView] =
    useState("timeline");

  const [filtro, setFiltro] =
    useState("todos");

  const [items, setItems] = useState(() => {
    try {
      const guardados =
        localStorage.getItem("items");

      return guardados
        ? JSON.parse(guardados)
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "items",
      JSON.stringify(items)
    );
  }, [items]);

  const addItem = (nuevoItem) => {
    setItems([...items, nuevoItem]);
  };

  const eliminarItem = (id) => {
    const nuevosItems = items.filter(
      (item) => item.id !== id
    );

    setItems(nuevosItems);
  };

  const itemsFiltrados =
    filtro === "todos"
      ? items
      : items.filter(
          (item) =>
            item.categoriaId === filtro
        );

  return (
    <div className="app">
      <Topbar
        view={view}
        setView={setView}
      />

      <Filters
        filtro={filtro}
        setFiltro={setFiltro}
      />

      <StatsCards items={items} />

      <FormularioItem addItem={addItem} />

      {view === "timeline" ? (
        <Timeline
          items={itemsFiltrados}
          eliminarItem={eliminarItem}
        />
      ) : (
        <CalendarView items={items} />
      )}
    </div>
  );
}

export default App;