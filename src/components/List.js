import React, { Component } from "react";
import styled from 'styled-components';

const MyTitle = styled.div`
  width: 100%;
  text-align: left;
  margin: 0 10px;
  padding: 20px;
  border: 1px solid transparent;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dfdfdf;

  :hover {
    cursor: pointer;
    border: 1px solid #6578FE;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
}
`
class List extends Component {

  openScope = event => {
    const scopeId = this.props.scopeId;
    this.props.goToScope(scopeId);
  };

  render() {
    return (
      <MyTitle onClick={this.openScope}>
        <p>{this.props.scopeId}</p>
        <p>{this.props.details.owner}</p>
        <p>{this.props.details.totals.coding}</p>
        <p>{this.props.details.totals.design}</p>
        <p>{this.props.details.totals.total}</p>
        <p>${this.props.details.totals.cost}</p>
      </MyTitle>
    );
  }
}

export default List;
