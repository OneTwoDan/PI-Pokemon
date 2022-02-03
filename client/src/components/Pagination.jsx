import React from "react";
import "../css/pagination.css";

export default function Pagination({ pokemonPerPage, allPokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.length <= 1 ? (
        <h1 className="loading">Loading...</h1> //corregir esto
      ) : (
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
      )}
    </div>
  );
}

