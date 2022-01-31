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
            {types.map((type) => (
              <div className="poketype" style={{backgroundColor: typeColors[type]}}>
                <li className="type" key={type.id}>{`${type}`}</li>
              </div>
            ))}
          </div>

          {/*           <div className="pokemon-stats">
            <p>Hp : 34</p>
            <p>Attack: 35</p>
            <p>Defense: 35</p>
            <p>Speed: 35</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
