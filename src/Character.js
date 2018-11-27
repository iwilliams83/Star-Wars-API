import React, { Component } from "react";

class Character extends Component {
  render() {
    const { character, getCharacterInfo } = this.props;
    return (
      <div>
        <h3 onClick={() => getCharacterInfo(character.url, character.name)}>
          {character.name}
        </h3>
      </div>
    );
  }
}

export default Character;
