import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../redux/actions";
/* import "../css/card.css"; */
import "../css/pokemonCreator.css";

export default function RecipeCreator() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que la pagina se refresque
    dispatch(postPokemon(formValues));
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleSelect = (e) => {
    setFormValues({
      ...formValues,
      type: [e.target.value, ...formValues.type],
    });
  };

/*   const handleDelete = (e) => {
    setFormValues({
      ...formValues,
      type: formValues.type.filter((t) => t !== e),
    });
  }; */

  function handleDelete (e) {
    setFormValues({
      ...formValues,
      type: formValues.type.filter((t) => t !== e),
  })}

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const validate = (values) => {
    const errors = {};
    var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(formValues.img);

    if (!values.name) {
      errors.name = "Name is required";
    } else if (!isNaN(values.name) === true) {
      errors.name = "Name can't be a number";
    }
    if (!values.hp) {
      errors.hp = "HP is required";
    } else if (values.hp < 0) {
      errors.hp = "HP must be more than 0";
    } else if (isNaN(values.hp) === true) {
      errors.hp = "HP can't be a word";
    }
    if (!values.attack) {
      errors.attack = "Attack is required";
    } else if (values.attack < "0") {
      errors.attack = "Attack must be more than 0";
    } else if (isNaN(values.attack) === true) {
      errors.attack = "Attack can't be a word";
    }
    if (!values.defense) {
      errors.defense = "Defense is required";
    } else if (values.defense < 0) {
      errors.defense = "Defense must be more than 0";
    } else if (isNaN(values.defense) === true) {
      errors.defense = "Defense can't be a word";
    }
    if (!values.speed) {
      errors.speed = "Speed is required";
    } else if (values.speed < 0) {
      errors.speed = "Speed must be more than 0";
    } else if (isNaN(values.speed) === true) {
      errors.speed = "Speed can't be a word";
    }
    if (!values.img) {
      errors.img = "You should put the Pokemon image link here";
    } else if (!validIMG) {
      errors.img = "Image must have a valid Link";
    }
    return errors;
  };

  return (
    <div className="container">
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Pokemon Created successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Create your Pokemon</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formValues.name}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
            <label>Health Points: </label>
            <input
              type="text"
              name="hp"
              placeholder="hp"
              value={formValues.hp}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.hp}</p>
          <div className="field">
            <label>Attack: </label>
            <input
              type="text"
              name="attack"
              placeholder="attack"
              value={formValues.attack}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.attack}</p>
          <div className="field">
            <label>Defense: </label>
            <input
              type="text"
              name="defense"
              placeholder="defense"
              value={formValues.defense}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.defense}</p>
          <div className="field">
            <label>Speed: </label>
            <input
              type="text"
              name="speed"
              placeholder="speed"
              value={formValues.speed}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.speed}</p>
          <div className="field">
            <label>Height: </label>
            <input
              type="text"
              name="height"
              placeholder="height"
              value={formValues.height}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <div className="field">
            <label>Weight: </label>
            <input
              type="text"
              name="weight"
              placeholder="weight"
              value={formValues.weight}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <div className="field">
            <label>Image Link: </label>
            <input
              type="text"
              name="img"
              placeholder="img"
              value={formValues.img}
              onChange={handleChange}
              autocomplete="off"
            />
          </div>
          <p>{formErrors.img}</p>
          <div>
            <label>Types: </label>
            <select onChange={handleSelect}>
              {types?.map((t) => (
                <option value={t.name}>{t.name}</option>
              ))}
            </select>
            {formValues.type.map((t) => (
              <div>
                <span>{t}</span>
                <button onClick={()=>handleDelete(t)}>X</button>
              </div>
            ))}
            <button className="submit-buttom">Create Pokemon</button>
          </div>
        </div>
      </form>
    </div>
  );
}
