import React, { Component } from "react";
import { characters } from "../assets/characters.json";
import Character from "./Character";
import Films from "./Films";

import "./styles.css";

class App extends Component {
  state = {
    filmData: [],
    loaded: false
  };

  getCharacterInfo = url => {
    this.setState({ loaded: false });
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
    const { filmData, loaded } = this.state;
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

        <div>{loaded ? <Films filmData={filmData} /> : null}</div>
      </div>
    );
  }
}

export default App;
