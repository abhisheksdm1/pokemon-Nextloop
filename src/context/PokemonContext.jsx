import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context object
const PokemonContext = createContext();

// Create a context provider component
export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonI, setPokemonI] = useState("");
  const [type, setType] = useState(null);

  return (
    <PokemonContext.Provider
      value={{ pokemon, setPokemon, pokemonI, setPokemonI, type, setType }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokemonContext;
