import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import Pokemon_logo from "../img/Pokemon_logo.png";
import "../css/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage /* setRecipesPerPage */] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
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

  return (
    <div className="pokeFullPage">
      <img src={Pokemon_logo} alt="img missing" className="pokeLogo" />
      <h1 className="danielName">Daniel PI</h1>
      <Link to="/pokemons">
        <button className="button-create">Create Pokemon</button>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all pokemons
      </button>
      <div>
        <select>
          <option>Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select>
          <option>Types</option>
          <option value="All">All types</option>
          <option value="normal">normal</option>
          <option value="fighting">fighting</option>
          <option value="flying">flying</option>
        </select>
        <select>
          <option value="All">All pokemons</option>
          <option value="created">From DB</option>
          <option value="api">From Api</option>
        </select>

        <Pagination
          pokemonPerPage={pokemonPerPage}
          allPokemons={allPokemons.length}
          pagination={pagination}
        />

        <div className="cardFather">
          {currentPokemon?.map((e) => {
            return (
              <div key={e.id}>
                <Link to={`pokemons/${e.id}`}>
                  <Card name={e.name} img={e.img} types={e.types}></Card>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
