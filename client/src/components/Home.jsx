import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterPokemonsByType,
  filterPokemonsByOrigin,
  orderByName,
} from "../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Pokemon_logo from "../img/Pokemon_logo.png";
import allTypes from "../helpers/allTypes";
import typeColors from "../helpers/arraysApp";
import "../css/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  const [order, setOrder] = useState(""); //

  const [currentPage, setCurrentPage] = useState(1);
  //
  const [pokemonPerPage /* setRecipesPerPage */] = useState(12);
  //             24               2              12
  const indexOfLastPokemon = currentPage * pokemonPerPage; //12
  //            12                      24              12
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;

  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon, // 12
    indexOfLastPokemon // 24
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterStatus(e) {
    dispatch(filterPokemonsByType(e.target.value)); //pasa el valor que cliquea el usuario
  }

  function handleFilterByOrigin(e) {
    dispatch(filterPokemonsByOrigin(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado${e.target.value}`);
  }

  return (
    <div className="pokeFullPage">
      <div className="images-pos">
        <div className="pokeLogo-position">
          <img src={Pokemon_logo} alt="img missing" className="pokeLogo" />
        </div>

        <div className="pokeNamePi-position">
          <h1 className="danielName">Daniel PI</h1>
        </div>
      </div>

      <div className="buttons-search-bar">
        <div className="buttom-form-position">
          <Link to="/pokemoncreator">
            <button className="buttons">Create Pokemon</button>
          </Link>
        </div>

        <SearchBar />

        <div className="buttom-refresh-position">
          <button
            className="buttons"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      <div>
        <div className="container-filters">
          <div className="custom-select">
            <select onChange={(e) => handleSort(e)}>
              <option>- - Order - -</option>
              <option value="Num">Number</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="type-position">
            <select onChange={(e) => handleFilterStatus(e)}>
              {allTypes.map((type, index) => {
                return (
                  <option key={index}
                    className="type-letter-color"
                    style={{ backgroundColor: typeColors[type] }}
                    value={type}
                  >
                    {type}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="apiDb-position">
            <select onChange={(e) => handleFilterByOrigin(e)}>
              <option value="All">All pokemons</option>
              <option value="created">Created</option>
              <option value="api">Existing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pagination-size">
        <Pagination
          pokemonPerPage={pokemonPerPage}
          allPokemons={allPokemons.length}
          pagination={pagination}
        />
      </div>

      <div className="all-cards">
        <div className="cardFather">
          {currentPokemon?.map((e) => {
            return (
              <div className="each-card" key={e.id}>
                <Link to={`pokemons/${e.id}`}>
                  <Card name={e.name} img={e.img} types={e.types} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
