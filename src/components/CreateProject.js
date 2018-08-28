import React, { Component } from "react";

class CreateProject extends Component {
  caseNumber = React.createRef();

  goToScope = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get the text from that input
    const scopeName = this.caseNumber.current.value;
    // 3. Change the page
    this.props.history.push(`/scope/${scopeName}`);
  };

  render() {
    return (
      <form className="project-creator" onSubmit={this.goToScope}>
        <h2>Create a Project</h2>
        <input
          type="text"
          ref={this.caseNumber}
          required
          defaultValue="1234"
          placeholder="Case Number"
        />
        <input type="text" placeholder="Company Name" />
        <button type="submit">Create Project</button>
      </form>
    );
  }
}

export default CreateProject;
