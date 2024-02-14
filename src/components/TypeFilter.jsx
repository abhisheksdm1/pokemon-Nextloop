import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PokemonContext from "../context/PokemonContext";

export default function TypeFilter() {
  const [typeList, setTypeList] = useState([]);
  //   const [type, setType] = useState(null);
  const { setType } = useContext(PokemonContext);
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
    </div>
  );
}
