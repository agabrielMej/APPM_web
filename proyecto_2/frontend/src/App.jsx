import Header from "./components/Header";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import Timeline from "./components/Timeline";

function App() {
  return (
    <div className="app">
      <Header />
      <Filters />
      <StatsCards />
      <Timeline />
    </div>
  );
}

export default App;