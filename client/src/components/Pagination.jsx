import React from "react";
import "../css/pagination.css";
import loading from "../img/loading.gif";
import pokedexError from "../img/pokedexError.gif";

export default function Pagination({
  pokemonPerPage,
  allPokemonsQuanty,
  pagination,
}) {
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil((allPokemonsQuanty || 0) / pokemonPerPage);
    i++
  ) {
    pages.push(i);
  }
console.log("allPokemonsQuanty", allPokemonsQuanty)
  function noResults() {
    if (allPokemonsQuanty == null) {
      return (
        <div className="loading-screen">
          <div className="loading-text">Loading...</div>
          <div className="">
            <img src={loading} alt="Loading" />
          </div>
        </div>
      );
    }
    if (allPokemonsQuanty === 0) {
      return <img src={pokedexError} alt="notFoundInfo" />
    }

    return (
      <nav className="pagination">
        <ul className="pages">
          {pages?.map((number) => (
            <li
              className="page"
              key={number}
              onClick={() => pagination(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div>
      <div>{noResults()}</div>
    </div>
  );
}
