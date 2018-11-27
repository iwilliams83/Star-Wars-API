import React, { Component } from "react";

class Films extends Component {
  render() {
    const { filmData } = this.props;
    return (
      <div>
        {filmData.map(data => {
          return (
            <div>
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
