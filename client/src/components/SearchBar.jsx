import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsParams } from "../redux/actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("name", name)
    const searchPokemon = getPokemonsParams(name)
    dispatch(searchPokemon);
  }

  return (
    <div className="full-search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
