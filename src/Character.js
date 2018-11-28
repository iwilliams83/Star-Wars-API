import React, { Component } from "react";


class Character extends Component {
  render() {
    const { character, getCharacterInfo } = this.props;
    const slug = character.name.toLowerCase().replace(/ /g,'-')

    return (
      <div className="character-card"
        onClick={() => getCharacterInfo(character.url, character.name)}>
        <img src={require(`./images/${slug}.jpg`)}
          alt="starwars character"
          className="character-img"
          />
        <h3 className="character-name">
          {character.name}
        </h3>
      </div>
    );
  }
}

export default Character;
