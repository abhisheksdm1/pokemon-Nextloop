import axios from "axios";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Modal from "react-modal";

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

Modal.setAppElement("#root");

export default function PokemonContainer({ url }) {
  const [pokemonInd, setPokemonInd] = useState(null);
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
  // fetch the individual pokemon
  useEffect(() => {
    axios
      .get(url)
      .then((response) => setPokemonInd(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [url]);

  return (
    <div className="">
      {/* modal for whole container */}
      <div
        className="w-80 bg-gray-200 flex flex-col items-center mb-3 p-4"
        onClick={openModal}
      >
        {/* fetching image */}
        {pokemonInd && (
          <img
            src={pokemonInd.sprites.front_default}
            alt="Pokemon"
            className="mx-auto"
            width={200}
            height={200}
          />
        )}
        {/* fetching name of pokemon */}
        {pokemonInd &&
          pokemonInd.forms.map((form, index) => (
            <div key={index} className="mx-auto mt-3">
              <h1 className="text-2xl text-blue-700">{form.name}</h1>
            </div>
          ))}
        {/* fetching type of pokemon */}
        <div className="flex items-center mt-3">
          <h1>Type:</h1>
          {pokemonInd &&
            pokemonInd.types.map((items, index) => (
              <div
                key={index}
                className="bg-red-500 p-2 text-white rounded ml-2"
              >
                <span>{items.type.name}</span>
              </div>
            ))}
        </div>
        {/* fetching pokemon stat */}
        <h1 className="mt-5">Stats</h1>
        <div className="mt-3 bg-blue-900 text-white flex flex-wrap justify-center p-2">
          {pokemonInd &&
            pokemonInd.stats.map((stats, index) => (
              <div key={index} className="mr-4 mb-2">
                <h1>
                  {stats.stat.name}:{" "}
                  <span className="bg-green-300 text-black-500">
                    {stats.base_stat}
                  </span>
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
          {/* fetching image */}
          {pokemonInd && (
            <img
              src={pokemonInd.sprites.front_default}
              alt="Pokemon"
              className="mx-auto"
              width={100}
              height={100}
            />
          )}
          {/*fetching name of pokemon   */}
          {pokemonInd &&
            pokemonInd.forms.map((form, index) => (
              <div key={index} className="mx-auto mt-3">
                <h1 className="text-2xl text-blue-700">{form.name}</h1>
              </div>
            ))}
          {/* fetching type of pokemon */}
          <div className="flex items-center mt-3">
            <h1>Type:</h1>
            {pokemonInd &&
              pokemonInd.types.map((items, index) => (
                <div
                  key={index}
                  className="bg-red-500 p-2 text-white rounded ml-2"
                >
                  <span>{items.type.name}</span>
                </div>
              ))}
          </div>
          {/* fetching pokemon stat */}
          <h1 className="mt-5">Stats</h1>
          <div className="mt-3 bg-blue-900 text-white flex flex-wrap justify-center p-2">
            {pokemonInd &&
              pokemonInd.stats.map((stats, index) => (
                <div key={index} className=" ">
                  <h1>
                    {stats.stat.name}:{" "}
                    <span className="bg-green-300 text-balck-500">
                      {stats.base_stat}
                    </span>
                  </h1>
                </div>
              ))}
          </div>
          {/* fetching pokemon ablities */}
          <h1>Abilities</h1>
          <div className="flex">
            {pokemonInd &&
              pokemonInd.abilities.map((item, index) => (
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
  );
}

PokemonContainer.propTypes = {
  url: PropTypes.string.isRequired,
};
