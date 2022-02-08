import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import PokemonCreator from "./components/PokemonCreator"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/pokemons/:id" component={Detail}/>
          <Route path="/pokemoncreator" component={PokemonCreator}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
