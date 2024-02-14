import axios from "axios";
import { useEffect, useState } from "react";
import PokemonFil from "./PokemonFil";
// import PokemonFil from "./PokemonFil";

export default function Filter() {
  const [typeList, setTypeList] = useState([]);
  const [type, setType] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type?offset=0&limit=10")
      .then((response) => setTypeList(response.data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function editHandler(url) {
    console.log("url", url);
    setType(() => url);
  }

  console.log("typelist", type);

  return (
    <div>
      <div className="flex flex-wrap flex-row">
        {typeList &&
          typeList.map(
            (
              item,
              index // Add null check for typeList
            ) => (
              <div key={index} className="flex justify center items-center">
                <h1
                  className="p-2 m-2 bg-red-500 rounded text-white"
                  onClick={() => editHandler(item.url)}
                >
                  {item.name}
                </h1>
              </div>
            )
          )}
      </div>
      <div className="w-auto">
        <div className="">
          <PokemonFil url={type} />
        </div>
      </div>
    </div>
  );
}
