import React, { Component } from "react";

class Page extends Component {
  render() {
    const { name, design, coding, total } = this.props.details;
    return (
      <div className="single-page">
        <h2 className="section-title">{name}</h2>
        <span className="pull-right">{design}</span>
        <span className="pull-right">{coding}</span>
        <span className="pull-right">{total}</span>
      </div>
    );
  }
}

export default Page;
