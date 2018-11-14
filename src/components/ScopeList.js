import React, { Component } from "react";
import List from "./List";
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 10px;
`

const MyTitle = styled.div`
  width: 100%;
  text-align: left;
  margin: 0 10px;
  padding: 20px;
  border: 1px solid transparent;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dfdfdf;

  p {
    font-size: 14px;
    margin: 0;
  }
}
`

class ScopeList extends Component {
  render() {
    return (
      <div>
        <FlexContainer>
          <MyTitle>
            <p>Scope ID</p>
            <p>Owner</p>
            <p>Coding</p>
            <p>Design</p>
            <p>Total</p>
            <p>Cost</p>
          </MyTitle>

          {Object.keys(this.props.scopes).map(key => (
            <List key={key} details={this.props.scopes[key]} scopeId={key} goToScope={this.props.goToScope} />
          ))}
        </FlexContainer>
        <div className="text-center mt-15 d-flex justify-content-center">
        </div>
      </div>
    );
  }
}

export default ScopeList;