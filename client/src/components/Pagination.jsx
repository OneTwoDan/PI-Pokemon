import React from "react";
import "../css/pagination.css";
import loading from "../img/loading.gif";

export default function Pagination({ pokemonPerPage, allPokemons, pagination }) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.length <= 0 ? (
        <div className="loading-screen">
        <div className="loading-text">Loading...</div>
        <div className="">
          <img src={loading} alt="Loading" />
        </div>
      </div>
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

