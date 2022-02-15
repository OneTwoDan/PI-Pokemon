import React from "react";
import { Link } from "react-router-dom";
import errorSearch from "../img/errorSearch.jpg";
import "../css/notFound.css";

export default function NotFound() {
  return (
    <div>
      <div className="notFound">
        <img src={errorSearch} alt="error404uLost" />
        <Link to="/home">
          <button className="homeButton red-error">
            Go back Home
          </button>
        </Link>
      </div>
    </div>
  );
}
