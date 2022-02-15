const { Router } = require("express");
const { getAllPokemons } = require("../aux_functions/pokemonFunctions");
const { Pokemon, Type } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    let pokemonsTotal = await getAllPokemons();

    if (name) {
      let pokemonsName = await pokemonsTotal.filter(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
      return pokemonsName.length
        ? res.status(200).send(pokemonsName[0])
        : res.status(200).json(null);
    } else {
      return res.json(pokemonsTotal);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const pokeFind = await getAllPokemons();
  try {
    const id = req.params.id;
    if (id) {
      const pokemonInfo = pokeFind.filter((e) => e.id == id);
      return pokemonInfo.length
        ? res.status(200).json(pokemonInfo[0])
        : res.status(200).json(null);
    }
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
    return res.json(newPokemon);
    /* res.send("Pokemon successfully created"); */
  } catch (e) {
    next(e);
  }
});

module.exports = router;
