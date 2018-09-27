import React, { Component } from "react";

class Title extends Component {
  render() {
    return (
      <div className="single-Title">
        <p className="Title-total d-inline-block base">Case Number: {this.props.scopeId} Owner: {this.props.details.owner}</p>
      </div>
    );
  }
}

export default Title;
