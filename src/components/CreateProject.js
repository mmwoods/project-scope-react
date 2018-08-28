import React, { Component } from "react";

class CreateProject extends Component {
  render() {
    return (
      <form className="project-creator">
        <h2>Create a Project</h2>
        <input type="text" required placeholder="Case Number" />
        <input type="text" required placeholder="Company Name" />
        <button type="submit">Create Project</button>
      </form>
    );
  }
}

export default CreateProject;
