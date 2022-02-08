import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index";
import { useEffect } from "react";
import loading from "../img/loading.gif";
import "../css/detail.css";
import typeColors from "../helpers/arraysApp";

export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const pokemonDetails = useSelector((state) => state.detail);

  function getClassName(pokemonDetails) {
    return pokemonDetails.types[0];
  }

  return (
    <div className="details" key={id}>
      {pokemonDetails ? (
        <div className="stats">
          <div className="full-window">
            <div className="position-buttom">
              <Link to="/home">
                <button className="loading-buttom">Home</button>
              </Link>
            </div>
            <div className="card-info-form">
              <div className="position-headliners">
                <span className="number-poke">{pokemonDetails.id}</span>
                <span className="name-poke">{pokemonDetails.name}</span>
                <div className="pokemon-types">
                  {pokemonDetails.types.map((type, index) => (
                    <div
                      key={index}
                      className="poketypes"
                      style={{ backgroundColor: typeColors[type] }}
                    >
                      <span className="type">{`${type}`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`img-stats ${getClassName(pokemonDetails)}`}>
                <div className="testeo-iamge">
                  <div className="position-image">
                    <img
                      src={
                        pokemonDetails.img
                          ? pokemonDetails.img
                          : "http://archive.pokedit.com/boards/ckfinder/userfiles/2/images/404_by_moltres93.jpg"
                      }
                      alt="Img not found"
                      width="400px"
                      height="400px"
                    />
                  </div>
                </div>
                <div className="all-stats">
                  <h2>Health: {pokemonDetails.hp}</h2>
                  <h2>attack: {pokemonDetails.attack}</h2>
                  <h3>Defense: {pokemonDetails.defense}</h3>
                  <h3>speed: {pokemonDetails.speed}</h3>
                  <h3>height: {pokemonDetails.height}</h3>
                  <h3>weight: {pokemonDetails.weight}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-screen">
          <div className="loading-text">Loading...</div>
          <div className="">
            <img src={loading} alt="Loading" />
          </div>
        </div>
      )}
    </div>
  );
}
