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
      <Navbar />
      <TypeFilter />
      {type == null ? <PokemonDisplay /> : <Filter />}
    </>
  );
}

export default App;
