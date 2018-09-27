import React, { Component } from "react";
import CreateScope from "./CreateScope";
import ScopeList from "./ScopeList";
import base from "../base";

class ScopeManager extends Component {
  state = {
    scopes: {}
  };

  goToScope = scopeName => {
    // Change the page
    this.props.history.push(`/scope/${scopeName}`);
  };

  componentDidMount() {
    this.ref = base.bindToState(`scopes`, {
      context: this,
      state: "scopes",
      asArray: false
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="text-center mt-15">
        <h2 className="text-center">Scope Manager</h2>
        <CreateScope goToScope={this.goToScope} />
        <ScopeList scopes={this.state.scopes} />
      </div>
    );
  }
}

export default ScopeManager;
