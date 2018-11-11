import React, { Component } from "react";
import styled from 'styled-components';

const MyInput = styled.input`
  width: calc(100% - 85px);
  padding: 10px;
  margin: 10px 0 0 10px;
  display: inline-block;
  vertical-align: top;
`

const MyButton = styled.button`
  border: 0;
  background: #6578FE;
  color: #fff;
  display: inline-block;
  vertical-align: top;
  width: 40px;
  margin: 10px 10px 0 0;
  height: 37px;
  font-size: 24px;
  line-height: 24px;
  font-weight: 300;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

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
      <form className="project-creator" onSubmit={this.createScope}>
        <MyInput
          type="text"
          ref={this.caseNumber}
          required
          defaultValue="Scope Name"
          placeholder="Case Number"
          className="mt-15"
        />
        <MyButton type="submit">+</MyButton>
      </form>
    );
  }
}

export default CreateScope;
