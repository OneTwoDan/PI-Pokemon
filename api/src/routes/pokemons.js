const { Router } = require("express");
const {
  getPokemonsApi,
  getPokemonsDb,
  getAllPokemons,
} = require("../aux_functions/pokemonFunctions");
const { Pokemon, Type } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let pokemonsTotal = await getAllPokemons();
    return res.json(pokemonsTotal);
  } catch (e) {
    next(e);
  }
});

router.get("/:param", async (req, res, next) => {
  try {
    const param = req.params.param;
    if (param.includes("-")) {
      const pokeFindDB = await Pokemon.findByPk(param);
      if (pokeFindDB === null) {
        return res.status(404).json("Id not found");
      }
      return res.status(200).json(pokeFindDB);
    }
    const pokeFind = await getPokemonsApi();
    //Por una cuestion de JS, un str con un number es == parseInt(str)
    if (param == parseInt(param)) {
      const pokemonInfo = pokeFind.filter((e) => e.id == param);
      return pokemonInfo.length
        ? res.status(200).json(pokemonInfo[0])
        : res.status(404).json("Id not found");
    }
    const pokemonDbInfo = await getPokemonsDb();
    const infoTotalPokemons = pokemonDbInfo.concat(pokeFind);

    const pokemonInfo = infoTotalPokemons.filter(
      (e) => e.name == param.toLowerCase()
    );
    return pokemonInfo.length
      ? res.status(200).json(pokemonInfo[0])
      : res.status(404).json("Name not found");
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      img,
      type,
    } = req.body;

    //status devuelve true cuando lo crea y falso cuando esta repetida y la omite
    const [newPokemon, status] = await Pokemon.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb,
        img,
      },
    });
    let typesDb = await Type.findAll({
      where: {
        name: type,
      },
    });

    newPokemon.addType(typesDb);

    /* return res.json(newPokemon, status); */
    res.send("Pokemon successfully created");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
