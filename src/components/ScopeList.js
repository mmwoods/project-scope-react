import React, { Component } from "react";
import List from "./List";
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 10px;
`

class ScopeList extends Component {
  render() {
    return (
      <div>
        <FlexContainer>
          <p>{this.props.key}</p>
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