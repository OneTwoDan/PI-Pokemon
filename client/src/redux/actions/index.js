import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_POKEMONS",
        payload: response.data,
      });
    } catch {
      return alert("Pokemon not found");
    }
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}

export function filterPokemonsByOrigin(payload) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload){
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  }
}

export function getPokemonsParams(payload) {
  return async function (dispatch) {
    try {
      const responseParam = await axios.get(
        `http://localhost:3001/pokemons/${payload}`
      );      
      return dispatch({
        type: "GET_POKEMON_PARAM",
        payload: responseParam.data,
      });     
    } catch (e) {
        console.log(e);
    }
  };
}

export function postPokemon(payload) {
  return async function () {
    const postResponse = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return postResponse;
  };
}

export function getTypes() {
  return async function (dispatch) {
    const responsePokemons = await axios.get("http://localhost:3001/types", {});
    return dispatch({
      type: "GET_TYPES",
      payload: responsePokemons.data,
    });
  };
}

export function getDetail(param) {
  return async function (dispatch) {
    try {
      const responseDetail = await axios.get(
        `http://localhost:3001/pokemons/${param}`
      );
      
      return dispatch({
        type: "GET_DETAILS",
        payload: responseDetail.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
