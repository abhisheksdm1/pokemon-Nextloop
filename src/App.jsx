import "./App.css";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import PokemonDisplay from "./components/PokemonDisplay";

function App() {
  return (
    <>
      <Navbar />
      <Filter />
      <PokemonDisplay />
    </>
  );
}

export default App;
