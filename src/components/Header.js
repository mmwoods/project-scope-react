import React, { Component } from "react";
import styled from 'styled-components';

const MyHeader = styled.header`
  background: #6578FE;
  height: 70px;
  line-height: 70px;
  text-align: center;
  color: #fff;
`
class Header extends Component {
  render() {
    return (
      <div>
        <MyHeader>
          <h1>Project Scoper</h1>
        </MyHeader>
      </div>
    );
  }
}

export default Header;
