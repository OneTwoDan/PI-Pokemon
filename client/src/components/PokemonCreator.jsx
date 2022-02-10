import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from "../redux/actions";
import "../css/pokemonCreator.css";
import typeColors from "../helpers/arraysApp";
import "../css/card.css";

export default function RecipeCreator() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que la pagina se refresque
    const errorsValidate = validate()
    setFormErrors(errorsValidate);
    if(Object.keys(errorsValidate).length === 0){
      const postResponse = await postPokemon(formValues)();
      console.log("postResponse", postResponse)
      history.push(`/pokemons/${postResponse.id}`);
    }
/*     setIsSubmit(true);
    setFormValues({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      type: [],
    }) */
  };

  const handleSelect = (e) => {
    if (!e.target.value) {
      return
    }
    if (formValues.type.length === 2) {
      alert("Solo se pueden ingresar dos tipos por Pokemon");
      return;
    }
    setFormValues({
      ...formValues,
      type: [...formValues.type, e.target.value],
    });
  };

  /*   const handleDelete = (e) => {
    setFormValues({
      ...formValues,
      type: formValues.type.filter((t) => t !== e),
    });
  }; */

  function handleDelete(e) {
    setFormValues({
      ...formValues,
      type: formValues.type.filter((t) => t !== e),
    });
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const validate = () => {
    const errors = {};
    var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(formValues.img);

    if (!formValues.name) {
      errors.name = "Name is required";
    } else if (!isNaN(formValues.name) === true) {
      errors.name = "Name can't be a number";
    }
    if (!formValues.hp) {
      errors.hp = "HP is required";
    } else if (formValues.hp < 0) {
      errors.hp = "HP must be more than 0";
    } else if (isNaN(formValues.hp) === true) {
      errors.hp = "HP can't be a word";
    }
    if (!formValues.attack) {
      errors.attack = "Attack is required";
    } else if (formValues.attack < "0") {
      errors.attack = "Attack must be more than 0";
    } else if (isNaN(formValues.attack) === true) {
      errors.attack = "Attack can't be a word";
    }
    if (!formValues.defense) {
      errors.defense = "Defense is required";
    } else if (formValues.defense < 0) {
      errors.defense = "Defense must be more than 0";
    } else if (isNaN(formValues.defense) === true) {
      errors.defense = "Defense can't be a word";
    }
    if (!formValues.speed) {
      errors.speed = "Speed is required";
    } else if (formValues.speed < 0) {
      errors.speed = "Speed must be more than 0";
    } else if (isNaN(formValues.speed) === true) {
      errors.speed = "Speed can't be a word";
    }
    if (!formValues.img) {
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
      ) : 
        
      <form onSubmit={handleSubmit}>
        <h1 className="title-form">Create your Pokemon</h1>
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
            <select className="types-selector" onChange={handleSelect}>
              <option value="" selected="" disabled="">- - Select - -</option>
              {types?.map((t) => (
                <option value={t.name}>{t.name}</option>
              ))}
            </select>
            {formValues.type.map((t) => (
              <div className="display-types">
                <div className="span-type">
                  <span className="type-size" style={{ backgroundColor: typeColors[t] }}>{t}</span>
                </div>
                <div className="cancel-test">
                  <span className="cancel-type" onClick={() => handleDelete(t)}>X</span>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className="submit-buttom">
            <button className="btn-create-pokemon">Create Pokemon</button>
          </div>
        </div>
      </form>
      }
    </div>
  );
}
