import React, { Component } from "react";
import Title from "./Title";

class ScopeList extends Component {
  render() {
    return (
      <div className="text-center mt-15">
        <h3 className="text-center">Scope List</h3>
        <p>{this.props.key}</p>
        {Object.keys(this.props.scopes).map(key => (
          <Title key={key} details={this.props.scopes[key]} scopeId={key} />
        ))}
      </div>
    );
  }
}

export default ScopeList;
