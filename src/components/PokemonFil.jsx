import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PokemonContainer from "./PokemonContainer";
// import PokemonContainer from "./PokemonContainer";
// import PokemonContainer from "./PokemonContainer";

export default function PokemonFil({ url }) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokemonData(response.data.pokemon);
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        // Handle error if necessary
      });
  }, [url]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {pokemonData.slice(0, 20).map((item, index) => (
        <div key={index} className="ml-5 mr-5 ">
          <PokemonContainer url={item.pokemon.url} />
        </div>
      ))}
    </div>
  );
}

PokemonFil.propTypes = {
  url: PropTypes.string.isRequired,
};
