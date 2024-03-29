import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";
import axios from "axios";

export default function Navbar() {
  const { pokemon, setPokemon, setPokemonI } = useContext(PokemonContext);

  function submitHandler() {
    const pokermon1 = pokemon;
    // Reset pokemonI to null before making a new request
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokermon1}`)
      .then((response) => setPokemonI(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <div className="p-5 flex justify-center">
      <input
        value={pokemon || ""}
        onChange={(e) => setPokemon(e.target.value)}
        className="p-2 mr-5 bg-gray-200"
      />
      <button
        onClick={submitHandler}
        className="bg-red-500 text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
