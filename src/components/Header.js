import React, { Component } from "react";
import MyHeader from '../components/styles/HeaderStyles';

class Header extends Component {
  render() {
    return (
      <div>
        <MyHeader>
          <h1>{this.props.scopeId} Scope</h1>
        </MyHeader>
      </div>
    );
  }
}

export default Header;
