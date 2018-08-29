import React, { Component } from "react";

class CreateScope extends Component {
  caseNumber = React.createRef();

  createScope = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get the text from that input
    const scopeName = this.caseNumber.current.value;
    // 3. Send to Project Manager
    this.props.goToScope(scopeName);
    // refresh the form
    // event.currentTarget.reset;
  };

  render() {
    return (
      <form className="project-creator mt-15" onSubmit={this.createScope}>
        <h2 className="text-center">Create a Scope</h2>
        <input
          type="text"
          ref={this.caseNumber}
          required
          defaultValue="1234"
          placeholder="Case Number"
          className="mt-15"
        />
        <input type="text" placeholder="Company Name" />
        <button type="submit">Create Project</button>
      </form>
    );
  }
}

export default CreateScope;
