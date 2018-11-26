import React, { Component } from "react";
import { characters } from "../assets/characters.json";
import Character from "./Character";

import "./styles.css";

class App extends Component {
  state = {
    filmData: [],
    loading: false
  };
  getCharacterInfo = url => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Data not found.");
      })
      .then(response => {
        this.getFilmData(response.films);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  getFilmData = urls => {
    let data = [];
    let apiCalls = [];
    apiCalls = urls.map(url => fetch(url).then(res => res.json()));

    Promise.all(apiCalls).then(response => {
      data = response.map(res => ({
        title: res.title,
        date: res.release_date
      }));
      this.setState({ filmData: data });
    });
  };

  render() {
    console.log(this.state);
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
