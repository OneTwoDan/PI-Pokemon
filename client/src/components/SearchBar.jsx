import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, cleanPokemons } from "../redux/actions/index";
import "../css/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(cleanPokemons())
    const searchPokemon = getPokemonByName(name)
    dispatch(searchPokemon);
    setName("")
  }

  return (
    <div className="full-search-bar">
      <input
        type="text"
        placeholder="Name of Pokemon"
        onChange={(e) => handleInputChange(e)}
        value={name}
        id="search-box"
        autoComplete="off"
      />
      <button id="search-btn" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
