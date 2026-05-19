import { useState } from "react";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import Timeline from "./components/Timeline";
import CalendarView from "./components/CalendarView";
import FormularioItem from "./components/FormularioItem";

function App() {
  const [view, setView] = useState("timeline");

  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),

      nombre: "Pecho y triceps",

      categoriaId: "fuerza",

      estado: "completado",

      puntuacion: 9,

      fechaRegistro: new Date().toISOString(),

      fechaActividad: new Date().toISOString(),

      notas: "Buen rendimiento en press banca",

      atributos: {
        duracion: 90,
        ejercicios: ["Press banca", "Press inclinado"],
      },

      activo: true,
    },

    {
      id: crypto.randomUUID(),

      nombre: "Cardio intenso",

      categoriaId: "cardio",

      estado: "pendiente",

      puntuacion: 7,

      fechaRegistro: new Date().toISOString(),

      fechaActividad: new Date().toISOString(),

      notas: "Falta mejorar resistencia",

      atributos: {
        duracion: 45,
        ejercicios: ["Caminadora", "Bicicleta"],
      },

      activo: true,
    },
  ]);

  const addItem = (nuevoItem) => {
    setItems([...items, nuevoItem]);
  };

  return (
    <div className="app">
      <Topbar view={view} setView={setView} />

      <Filters />

      <StatsCards />

      <FormularioItem addItem={addItem} />

      {view === "timeline" ? (
        <Timeline items={items} />
      ) : (
        <CalendarView />
      )}
    </div>
  );
}

export default App;