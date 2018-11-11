import React, { Component } from "react";
import CreateScope from "./CreateScope";
import ScopeGrid from "./ScopeGrid";
import ScopeList from "./ScopeList";
import base from "../base";
import styled from 'styled-components';
import MyHeader from '../components/styles/HeaderStyles';

const ManagerContainer = styled.div`
  background-color: #F8F8F8;
  margin-top: 15px;
  text-align: center;
  width: 80%;
`

const MySidebar = styled.div`
  width: 20%;
  border-right: 1px solid #dfdfdf;
  height: 100vh;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

class ScopeManager extends Component {
  state = {
    scopes: {}
  };

  goToScope = scopeName => {
    // Change the page
    this.props.history.push(`/scope/${scopeName}`);
  };

  componentDidMount() {
    this.ref = base.bindToState(`scopes`, {
      context: this,
      state: "scopes",
      asArray: false
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div>
        <MyHeader>
          <h1>Scope Manager</h1>
        </MyHeader>
        <FlexContainer>
          <MySidebar>
            <CreateScope goToScope={this.goToScope} />
          </MySidebar>
          <ManagerContainer>
            <ScopeGrid goToScope={this.goToScope} scopes={this.state.scopes} />
            <ScopeList goToScope={this.goToScope} scopes={this.state.scopes} />
          </ManagerContainer>
        </FlexContainer>
      </div>
    );
  }
}

export default ScopeManager;
