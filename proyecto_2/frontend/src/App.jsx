import {
  useContext,
  useMemo,
  useState,
} from "react";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import Timeline from "./components/Timeline";
import CalendarView from "./components/CalendarView";
import FormularioItem from "./components/FormularioItem";
import ChartsDashboard from "./components/ChartsDashboard";

import {
  StorageContext,
} from "./context/StorageProvider";

import {
  ThemeContext,
} from "./context/ThemeProvider";

function App() {
  const [view, setView] =
    useState("timeline");

  const {
    tema,
    toggleTema,
  } = useContext(
    ThemeContext
  );

  const {
    modo,
    setModo,

    estado,

    items,

    dispatch,

    guardarItem,

    eliminarItem,
  } = useContext(
    StorageContext
  );

  const itemsFiltrados =
    useMemo(() => {
      let resultado =
        items.filter(
          (item) =>
            item.activo
        );

      if (
        estado.filtroCategoria !==
        "todas"
      ) {
        resultado =
          resultado.filter(
            (item) =>
              item.categoriaId ===
              estado.filtroCategoria
          );
      }

      if (
        estado.filtroEstado !==
        "todos"
      ) {
        resultado =
          resultado.filter(
            (item) =>
              item.estado ===
              estado.filtroEstado
          );
      }

      if (
        estado.busqueda
      ) {
        resultado =
          resultado.filter(
            (item) =>
              item.nombre
                .toLowerCase()
                .includes(
                  estado.busqueda.toLowerCase()
                )
          );
      }

      return resultado;
    }, [
      items,

      estado.filtroCategoria,

      estado.filtroEstado,

      estado.busqueda,
    ]);

  return (
    <div className="app">
      <Topbar
        view={view}
        setView={setView}

        modo={modo}
        setModo={setModo}

        tema={tema}
        toggleTema={
          toggleTema
        }
      />

      <Filters
        estado={estado}
        dispatch={
          dispatch
        }
      />

      <StatsCards
        items={
          itemsFiltrados
        }
      />

      <FormularioItem
        addItem={
          guardarItem
        }
      />

      <ChartsDashboard
         items={itemsFiltrados}
      />

      {view ===
      "timeline" ? (
        <Timeline
          items={
            itemsFiltrados
          }

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