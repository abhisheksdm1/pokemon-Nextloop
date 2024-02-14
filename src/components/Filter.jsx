import { useContext } from "react";
import PokemonFil from "./PokemonFil";
import PokemonContext from "../context/PokemonContext";

export default function Filter() {
  //   const [type, setType] = useState(null);
  const { type } = useContext(PokemonContext);

  return (
    <div>
      <div className="w-auto">
        <div className="">
          <PokemonFil url={type} />
        </div>
      </div>
    </div>
  );
}
