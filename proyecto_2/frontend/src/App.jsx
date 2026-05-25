import {
  useContext,
  useState,
} from "react";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import Timeline from "./components/Timeline";
import CalendarView from "./components/CalendarView";
import FormularioItem from "./components/FormularioItem";

import {
  StorageContext,
} from "./context/StorageProvider";

function App() {
  const [view, setView] =
    useState("timeline");

  const [filtro, setFiltro] =
    useState("todos");

  const {
    modo,
    setModo,

    items,

    guardarItem,

    eliminarItem,
  } = useContext(
    StorageContext
  );

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
        modo={modo}
        setModo={setModo}
      />

      <Filters
        filtro={filtro}
        setFiltro={setFiltro}
      />

      <StatsCards
        items={items}
      />

      <FormularioItem
        addItem={guardarItem}
      />

      {view === "timeline" ? (
        <Timeline
          items={itemsFiltrados}
          eliminarItem={
            eliminarItem
          }
        />
      ) : (
        <CalendarView
          items={items}
        />
      )}
    </div>
  );
}

export default App;