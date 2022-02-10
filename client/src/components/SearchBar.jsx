import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonsParams, cleanPokemons } from "../redux/actions/index";
import "../css/searchBar.css";
import loading from "../img/loading.gif";

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
    const searchPokemon = getPokemonsParams(name)
    dispatch(searchPokemon);
    setName("")
  }

  return (
    <div className="full-search-bar">
      <input
        type="text"
        placeholder="Name or number of Pokemon"
        onChange={(e) => handleInputChange(e)}
        value={name}
        id="search-box"
        autocomplete="off"
      />
      <button id="search-btn" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
