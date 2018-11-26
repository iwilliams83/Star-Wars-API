import React, { Component } from "react";
import { characters } from "../assets/characters.json";
import Character from "./Character";

import "./styles.css";

class App extends Component {
  getCharacterInfo = url => {};

  render() {
    return (
      <div className="App">
        {characters.map(character => {
          return (
            <Character
              character={character}
              getCharacterInfo={this.getCharacterInfo}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
