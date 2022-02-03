import React from "react";
import typeColors from "../helpers/arraysApp";
import "../css/card.css";

export default function Card({ name, img, types }) {
  function getClassName(types) {
    return types[0];
  }

  return (
    <div className={`pokemon-card-container ${getClassName(types)}`}>
      <div className="pokemon-card">
        <div className="background">
          <img className="image" src={img} alt="img not found" />
        </div>

        <div className="content">
          <h1 className="pokemon-name">{name}</h1>
          
          <div className="pokemon-type">
            {types.map((type, index) => (
              <div key={index} className="poketype" style={{backgroundColor: typeColors[type]}}>
                <span className="type" >{`${type}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
