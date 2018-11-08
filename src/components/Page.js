import React, { Component } from "react";

class Page extends Component {
  render() {
    const { name, design, coding, total } = this.props.details;
    return (
      <div className="single-page">
        <h2 className="page-title d-inline-block base">{name}</h2>
        <p>Design: {design}</p>
        <p>Coding: {coding}</p>
        <p>Total: {total}</p>
      </div>
    );
  }
}

export default Page;
