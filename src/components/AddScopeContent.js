import React, { Component } from "react";

class AddScopeContent extends Component {
  nameRef = React.createRef();
  typeRef = React.createRef();
  designRef = React.createRef();
  codingRef = React.createRef();
  totalRef = React.createRef();
  costRef = React.createRef();

  createPage = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    const page = {
      name: this.nameRef.current.value,
      type: this.typeRef.current.value,
      design: parseFloat(this.designRef.current.value),
      coding: parseFloat(this.codingRef.current.value),
      total: parseFloat(this.totalRef.current.value),
      cost: this.costRef.current.value
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
        <select name="type" ref={this.typeRef}>
          <option value="design">Design</option>
          <option value="coding">Coding</option>
        </select>
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
        <input
          name="total"
          ref={this.totalRef}
          type="text"
          placeholder="Total Hours"
        />
        <input name="cost" ref={this.costRef} type="text" placeholder="Cost" />
        <button type="submit">Add Page</button>
      </form>
    );
  }
}

export default AddScopeContent;
