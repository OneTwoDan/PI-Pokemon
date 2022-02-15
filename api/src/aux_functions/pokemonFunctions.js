const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getPokemonsApi = async () => {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  let pokeInfo = [];
  for (let i = 252; i <= 292; i++) {
    const apiInfo = await axios.get(URL + i);
    pokeInfo.push({
      id: apiInfo.data.id,
      name: apiInfo.data.name,
      hp: apiInfo.data.stats[0].base_stat,
      attack: apiInfo.data.stats[1].base_stat,
      defense: apiInfo.data.stats[2].base_stat,
      speed: apiInfo.data.stats[5].base_stat,
      height: apiInfo.data.height,
      weight: apiInfo.data.weight,
      createdInDb: false,
      img: apiInfo.data.sprites.front_default,
      types: apiInfo.data.types,
    });
  }
  return mapper(pokeInfo);
};

const getPokemonsDb = async () => {
  const pokemonsDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return mapper2(pokemonsDb);
};

const getAllPokemons = async () => {
  const apiInfo = await getPokemonsApi();
  const dbInfo = await getPokemonsDb();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const getOrCreateTypes = async () => {
  const apiTypes = await axios.get("https://pokeapi.co/api/v2/type");
  const types = apiTypes.data.results.map((type) => {
    return type.name;
  });

  types.forEach((type) => {
    Type.findOrCreate({
      where: {
        name: type,
      },
    });
  });

  const typesDb = await Type.findAll();

  return typesDb;
};

const mapper = (ArrayObj) => {
  return ArrayObj.map(
    ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      img,
      types
    }) => ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      img,
      types: types.map((element) => element.type.name),
    })
  ); 
};

const mapper2 = (ArrayObj) => {
  return ArrayObj.map(
    ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      img,
      types
    }) => ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      img,
      types: types.map((element) => element.name),
    })
  ); 
};

module.exports = {
  getPokemonsApi,
  getPokemonsDb,
  getAllPokemons,
  getOrCreateTypes,
};
