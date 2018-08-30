import React, { Component } from "react";

class Page extends Component {
  render() {
    const { name, design, coding, total, cost } = this.props.details;
    return (
      <div className="single-page">
        <h2 className="section-title">{name}</h2>
        <p className="pull-right">Design Hours: {design}</p>
        <p className="pull-right">Coding Hours: {coding}</p>
        <p className="pull-right">Total Hours: {total}</p>
        {/* <p className="pull-right">Total Cost: ${cost}</p> */}
      </div>
    );
  }
}

export default Page;
