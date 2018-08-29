import React, { Component } from "react";
import CreateScope from "./CreateScope";

class ProjectManager extends Component {
  goToScope = scopeName => {
    // Change the page
    this.props.history.push(`/scope/${scopeName}`);
  };

  render() {
    return (
      <div className="text-center mt-15">
        <h2 className="text-center">Scope Manager</h2>
        <CreateScope goToScope={this.goToScope} />
      </div>
    );
  }
}

export default ProjectManager;
