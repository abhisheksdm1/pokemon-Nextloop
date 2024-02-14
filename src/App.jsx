import { useContext } from "react";
import "./App.css";
import Filter from "./components/Filter";
import Navbar from "./components/Navbar";
import PokemonDisplay from "./components/PokemonDisplay";
import PokemonContext from "./context/PokemonContext";
import TypeFilter from "./components/TypeFilter";

function App() {
  const { type } = useContext(PokemonContext);

  return (
    <>
      {/* serch Navbaar */}
      <Navbar />
      {/*Pokemon type List */}
      <TypeFilter />
      {/* PokemonDisplay is like list of pokemon anf Filter is filte by type pokemon */}
      {type == null ? <PokemonDisplay /> : <Filter />}
    </>
  );
}

export default App;
