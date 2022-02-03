import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../redux/actions";
import "../css/card.css";

export default function RecipeCreator() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateErrors({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      type: input.type.filter((t) => e !== t),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Pokemon Created");
    dispatch(postPokemon(input));
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      type: [],
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function validateErrors(input) {
    var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);
    let errors = {};

    if (!input.name) {
      errors.name = "Each Pokemon must have a Name!";
    } else if (!input.img || !validIMG) {
      errors.img = "Image must have a valid Link.";
    } else if (!input.hp) {
      errors.img = "Image must have a valid Link.";
    } else if (!input.attack) {
      errors.attack = "The Pokemon needs this attribute";
    } else if (!input.defense) {
      errors.defense = "The Pokemon needs this attribute";
    } else if (!input.speed) {
      errors.speed = "The Pokemon needs this attribute";
    }
    return errors;
  }

  return (
    <div>
      <Link to="/home">
        <button>Go back</button>
      </Link>
      <h1>Create your own Pokemon!</h1>
      <form
        autocomplete="off"
        id="form-create-pokemon"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label>Name: </label>
          <input
            class="form__input"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div>
          <label>Health Points: </label>
          <input
            class="form__input"
            type="text"
            value={input.hp}
            name="hp"
            onChange={handleChange}
          />
          {errors.hp && <p className="error">{errors.hp}</p>}
        </div>
        <div>
          <label>Attack: </label>
          <input
            class="form__input"
            type="text"
            value={input.attack}
            name="attack"
            onChange={handleChange}
          />
          {errors.attack && <p className="error">{errors.attack}</p>}
        </div>
        <div>
          <label>Defense: </label>
          <input
            class="form__input"
            type="text"
            value={input.defense}
            name="defense"
            onChange={handleChange}
          />
          {errors.defense && <p className="error">{errors.defense}</p>}
        </div>
        <div>
          <label>Speed: </label>
          <input
            class="form__input"
            type="text"
            value={input.speed}
            name="speed"
            onChange={handleChange}
          />
          {errors.speed && <p className="error">{errors.speed}</p>}
        </div>
        <div>
          <label>Height: </label>
          <input
            class="form__input"
            type="text"
            value={input.height}
            name="height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Weight: </label>
          <input
            class="form__input"
            type="text"
            value={input.weight}
            name="weight"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image: </label>
          <input
            class="form__input"
            type="text"
            value={input.img}
            name="img"
            onChange={handleChange}
            placeholder="Inserte un link"
          />
          {errors.img && <p className="error">{errors.img}</p>}
        </div>
        <div>
          <label>Types: </label>
          <select onChange={(e) => handleSelect(e)}>
            {types?.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>

          {input.type.map((t) => (
            <div>
              <span>{t}</span>
              <button onClick={() => handleDelete(t)}>X</button>
            </div>
          ))}
          <button type="submit">Create Pokemon</button>
        </div>
      </form>
    </div>
  );
}
