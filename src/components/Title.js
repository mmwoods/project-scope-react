import React, { Component } from "react";
import styled from 'styled-components';

const MyTitle = styled.div`
  width: auto;
  border: 1px solid #dfdfdf;
  background-color: #fff;
  border-radius: 10px;
  text-align: left;
  margin: 10px 10px;
  padding: 20px;

  :hover {
    cursor: pointer;
    border: 1px solid #6578FE;
  }

  h1 {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 400;
  }
  p {
    font-size: 12px;
    color: #aaa;
    margin: 0;
  }
}
`
class Title extends Component {

  openScope = event => {
    const scopeId = this.props.scopeId;
    this.props.goToScope(scopeId);
  };

  render() {
    return (
      <MyTitle onClick={this.openScope}>
        <h1>{this.props.scopeId}</h1>
        <p>Edited by {this.props.details.owner}</p>
      </MyTitle>
    );
  }
}

export default Title;
