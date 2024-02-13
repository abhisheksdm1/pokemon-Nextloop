import { useEffect, useState } from "react";
import axios from "axios";
import PokemonContainer from "./PokemonContainer";

export default function PokemonDisplay() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  const fetchPokemonList = async (url) => {
    try {
      const response = await axios.get(url);
      setPokemonList(response.data.results);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  useEffect(() => {
    fetchPokemonList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  }, []);

  const handleNextPage = async () => {
    if (nextPageUrl) {
      await fetchPokemonList(nextPageUrl);
    }
  };

  const handlePrevPage = async () => {
    if (prevPageUrl) {
      await fetchPokemonList(prevPageUrl);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="ml-5 mr-5">
            <PokemonContainer name={pokemon.name} url={pokemon.url} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={handlePrevPage}
          disabled={!prevPageUrl}
          className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPageUrl}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
