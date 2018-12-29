import React, { Component } from "react";


class Character extends Component {
  render() {
    const { character, getCharacterInfo } = this.props;
    const slug = character.name.toLowerCase().replace(/ /g,'-')

    return (
      <div className="character-card" data-testid="character-card"
        onClick={() => getCharacterInfo(character.url, character.name)}>
        <img src={require(`./images/${slug}.jpg`)}
          alt="Responsive image"
          className="character-img"
          className="img-fluid"
          />
        <h4 className="character-name">
          {character.name}
        </h4>
      </div>
    );
  }
}

export default Character;
