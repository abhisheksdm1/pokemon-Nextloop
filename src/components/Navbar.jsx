import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  function searchPokemo() {}
  return (
    <div className="p-5 flex justify-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 mr-5 bg-gray-200"
      />
      <button
        onClick={searchPokemo}
        className="bg-red-500 text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
