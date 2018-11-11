import React, { Component } from "react";

class Title extends Component {

  openScope = event => {
    const scopeId = this.props.scopeId;
    this.props.goToScope(scopeId);
  };

  render() {
    return (
      <div className="single-title" onClick={this.openScope}>
        <p className="Title-total d-inline-block base">Case Number: {this.props.scopeId}, Owner: {this.props.details.owner}</p>
        <p>Coding: {this.props.details.totals.coding}, Design: {this.props.details.totals.design}, Total: {this.props.details.totals.total}, Cost: {this.props.details.totals.cost}</p>
      </div>
    );
  }
}

export default Title;
