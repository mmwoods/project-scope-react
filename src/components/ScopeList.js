import React, { Component } from "react";
import Title from "./Title";

class ScopeList extends Component {
  render() {
    return (
      <div>
        <h3 className="text-center">Scope List</h3>
        <div className="text-center mt-15 d-flex justify-content-center">
          <p>{this.props.key}</p>
          {Object.keys(this.props.scopes).map(key => (
            <Title key={key} details={this.props.scopes[key]} scopeId={key} goToScope={this.props.goToScope} />
          ))}
        </div>
      </div>
    );
  }
}

export default ScopeList;
