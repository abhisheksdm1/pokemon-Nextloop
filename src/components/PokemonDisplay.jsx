import { useEffect, useState } from "react";
import axios from "axios";
import PokemonContainer from "./PokemonContainer";
import { useContext } from "react";
import PokemonContext from "../context/PokemonContext";
import Modal from "react-modal";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function PokemonDisplay() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const { pokemon, pokemonI } = useContext(PokemonContext);
  const fetchPokemonList = async () => {
    const key = import.meta.env.VITE_KEY;
    try {
      const response = await axios.get(key);
      setPokemonList(response.data.results);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };
  //  pokemon list url
  useEffect(() => {
    fetchPokemonList();
  }, []);

  //
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

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {/* if search is empty then display main pokemon list */}
      {pokemon == "" ? (
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
      ) : (
        <div>
          <div className="flex justify-center">
            <div
              className="w-80 bg-gray-200 flex flex-col items-center mb-3 p-4"
              onClick={openModal}
            >
              {pokemonI && (
                <img
                  src={pokemonI.sprites.front_default}
                  alt="Pokemon"
                  className="mx-auto"
                  width={200}
                  height={200}
                />
              )}
              {pokemonI &&
                pokemonI.forms.map((form, index) => (
                  <div key={index} className="mx-auto mt-3">
                    <h1 className="text-2xl text-blue-700">{form.name}</h1>
                  </div>
                ))}
              <div className="flex items-center mt-3">
                <h1>Type:</h1>
                {pokemonI &&
                  pokemonI.types.map((items, index) => (
                    <div
                      key={index}
                      className="bg-red-500 p-2 text-white rounded ml-2"
                    >
                      <span>{items.type.name}</span>
                    </div>
                  ))}
              </div>
              <h1 className="mt-5">Stats</h1>
              <div className="mt-3 bg-blue-900 text-white flex flex-wrap justify-center p-2">
                {pokemonI &&
                  pokemonI.stats.map((stats, index) => (
                    <div key={index} className="mr-4 mb-2">
                      <h1>
                        {stats.stat.name}:{" "}
                        <span className="bg-green-300 ">{stats.base_stat}</span>
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Pokemon Modal"
            >
              <div className="w-80 bg-gray-200 flex flex-col items-center mb-3 p-4">
                {pokemonI && (
                  <img
                    src={pokemonI.sprites.front_default}
                    alt="Pokemon"
                    className="mx-auto"
                    width={100}
                    height={100}
                  />
                )}
                {pokemonI &&
                  pokemonI.forms.map((form, index) => (
                    <div key={index} className="mx-auto mt-3">
                      <h1 className="text-2xl text-blue-700">{form.name}</h1>
                    </div>
                  ))}
                <div className="flex items-center mt-3">
                  <h1>Type:</h1>
                  {pokemonI &&
                    pokemonI.types.map((items, index) => (
                      <div
                        key={index}
                        className="bg-red-500 p-2 text-white rounded ml-2"
                      >
                        <span>{items.type.name}</span>
                      </div>
                    ))}
                </div>
                <h1 className="mt-5">Stats</h1>
                <div className="mt-3 bg-blue-900 text-white flex flex-wrap justify-center p-2">
                  {pokemonI &&
                    pokemonI.stats.map((stats, index) => (
                      <div key={index} className="mr-4 mb-2">
                        <h1>
                          {stats.stat.name}:{" "}
                          <span className="bg-green-300 text-black">
                            {stats.base_stat}
                          </span>
                        </h1>
                      </div>
                    ))}
                </div>
                <h1>Abilities</h1>
                <div className="flex">
                  {pokemonI &&
                    pokemonI.abilities.map((item, index) => (
                      <div key={index} className="flex m-2 justify-center">
                        <h1>{item.ability.name}</h1>
                      </div>
                    ))}
                </div>
              </div>
              <button
                className="bg-red-500 p-2 rounded text-white"
                onClick={closeModal}
              >
                Close
              </button>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
