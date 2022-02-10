const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: statusFiltered,
      };
    case "FILTER_BY_ORIGIN":
      const allPokemons2 = state.allPokemons;
      let OriginFiltered = allPokemons2;
      if (action.payload === "created") {
        OriginFiltered = state.allPokemons.filter((e) => e.createdInDb);
      } else if (action.payload === "api") {
        OriginFiltered = state.allPokemons.filter((e) => !e.createdInDb);
      } else {
        OriginFiltered = allPokemons2;
      }
      return {
        ...state,
        pokemons: OriginFiltered,
      };

    case "ORDER_BY_NAME":
      const allPokemons3 = state.allPokemons;
      const sorted =
        action.payload === "asc"
          ? allPokemons3.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allPokemons3.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allPokemons: sorted,
      };
    case "ORDER_BY_ATTACK":
      const allPokemons4 = state.allPokemons;
      const sorted2 =
        action.payload === "high"
          ? allPokemons4.sort((a, b) => {
              return b.attack - a.attack;
            })
          : allPokemons4.sort((a, b) => {
              return a.attack - b.attack;
            });
      return {
        ...state,
        pokemons: sorted2,
      };
    case "GET_POKEMON_PARAM":
      return {
        ...state,
        pokemons: [action.payload],
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "CLEAN_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
      case "CLEAN_DETAILS":
        return {
          ...state,
          detail: action.payload,
        };
    default:
      return state;
  }
}

export default rootReducer;
