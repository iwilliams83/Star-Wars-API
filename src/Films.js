import React, { Component } from "react";

class Films extends Component {
  render() {
    const { filmData, character } = this.props;
    return (
      <div className="film-list">
        <h2
          data-testid="list-header"
          className="list-header">Films that {character} appears in:
        </h2>
        {filmData.map(data => {
          return (
            <div key={data.title} data-testid="film-info">
              <h4>Film Title:&nbsp; {data.title}</h4>
              <p>Release Date:&nbsp; {data.date}</p>
            <hr />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Films;
