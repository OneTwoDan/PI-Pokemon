import React from "react";
import { Link } from "react-router-dom";
import "../css/landingPage.css"

export default function LandingPage() {
  return (
    <div className="landing">
      <div>
        <h1 className="welcomeMsg">WELCOME TO POKEAPP</h1>
        <Link to="/home">
          <button className="homeButton">
            <span id="span1"></span>
            <span id="span2"></span>
            <span id="span3"></span>
            <span id="span4"></span>
            START
            </button>
        </Link>
      </div>
      </div>
  );
}