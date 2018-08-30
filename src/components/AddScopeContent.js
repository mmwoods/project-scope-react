import React, { Component } from "react";

class AddScopeContent extends Component {
  nameRef = React.createRef();
  designRef = React.createRef();
  codingRef = React.createRef();

  createPage = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    const codingHours = parseFloat(this.codingRef.current.value);
    const designHours = parseFloat(this.designRef.current.value);
    const total = codingHours + designHours;
    const page = {
      name: this.nameRef.current.value,
      design: designHours,
      coding: codingHours,
      total: total,
      cost: total * 160
    };
    this.props.addPage(page);
    // refresh the form
    // event.currentTarget.reset;
  };
  render() {
    return (
      <form className="scope-edit" onSubmit={this.createPage}>
        <input
          name="name"
          ref={this.nameRef}
          type="text"
          placeholder="Page Name"
        />
        <input
          name="design"
          ref={this.designRef}
          type="text"
          placeholder="Design Hours"
        />
        <input
          name="coding"
          ref={this.codingRef}
          type="text"
          placeholder="Coding Hours"
        />
        <button type="submit">Add Page</button>
      </form>
    );
  }
}

export default AddScopeContent;
