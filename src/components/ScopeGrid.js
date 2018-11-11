import React, { Component } from "react";
import Title from "./Title";
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 10px;
`

class ScopeGrid extends Component {
  render() {
    return (
      <div>
        <FlexContainer>
          <p>{this.props.key}</p>
          {Object.keys(this.props.scopes).map(key => (
            <Title key={key} details={this.props.scopes[key]} scopeId={key} goToScope={this.props.goToScope} />
          ))}
        </FlexContainer>
        <div className="text-center mt-15 d-flex justify-content-center">
        </div>
      </div>
    );
  }
}

export default ScopeGrid;