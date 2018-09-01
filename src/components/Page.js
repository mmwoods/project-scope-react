import React, { Component } from "react";

class Page extends Component {
  render() {
    const { name, design, coding, total } = this.props.details;
    return (
      <div className="single-page">
        <p className="page-total d-inline-block base">{total}</p>
        <h2 className="page-title d-inline-block base">{name}</h2>
        {/* <p>Design Hours: {design}</p>
        <p>Coding Hours: {coding}</p> */}
      </div>
    );
  }
}

export default Page;
