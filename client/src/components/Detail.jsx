import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index";
import { useEffect } from "react";

export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const pokemonDetails = useSelector((state) => state.detail);

  return (
    <div className="details" key={id}>
      {pokemonDetails ? (
        <div>
          <h1>{pokemonDetails.name}</h1>
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
          <h2>Health: {pokemonDetails.hp}</h2>
          <h2>attack: {pokemonDetails.attack}</h2>
          <h3>Defense: {pokemonDetails.defense}</h3>
          <h3>speed: {pokemonDetails.speed}</h3>
          <h3>height: {pokemonDetails.height}</h3>
          <h3>weight: {pokemonDetails.weight}</h3>
        </div>
      ) : (
        <span>Loading you fucking pokemon</span>
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
