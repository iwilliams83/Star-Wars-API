import React, { Component } from "react";
import { characters } from "./characters";
import Character from "./Character";
import Films from "./Films";
import { characterAPIcall, filmDataAPIcall } from "./api"

import "./styles.css";

class App extends Component {
  state = {
    selectedCharacter: "",
    filmData: [],
    loaded: false,
    error: false
  };

  getCharacterInfo = (url, name) => {
    this.setState({ loaded: false, selectedCharacter: name });
    characterAPIcall(url)
      .then(response => {
        this.setState({ error: false });
        this.getFilmData(response.films);
      })
      .catch(error => {
        this.setState({ error: true });
        console.error(error.message);
      });
  };

  getFilmData = urls => {
    let data = [];
    let apiCalls = [];
    
    filmDataAPIcall(urls).then(response => {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      data = response.map(res => {
        let date = new Date(res.release_date);
        return {
          title: res.title,
          date: date.toLocaleDateString("en-US", options)
        };
      });
      this.setState({ filmData: data, loaded: true });
    });
  };

  render() {
    const { filmData, loaded, error, selectedCharacter } = this.state;
    return (
      <div className="App">
        <div className="character-container">
          {characters.map(character => {
            return (
              <Character key={character.name}
                character={character}
                getCharacterInfo={this.getCharacterInfo}
              />
            );
          })}
        </div>
        <div>
          {loaded && !error ? (
            <div>
              <Films filmData={filmData} character={selectedCharacter}/>
            </div>
          ) : (
            error && <div className="error-msg"><br/>No data found for {selectedCharacter}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
