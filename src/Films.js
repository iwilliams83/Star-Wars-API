import React, { Component } from "react";

class Films extends Component {
  render() {
    const { filmData, character } = this.props;
    return (
      <div className="film-list">
        <h2>Film Data for {character}</h2>
        {filmData.map(data => {
          return (
            <div key={data.title}>
              <h3>{data.title}</h3>
              <p>{data.date}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Films;
