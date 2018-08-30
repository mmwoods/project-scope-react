import React, { Component } from "react";
import Page from "./Page";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-wrapper w-20 d-inline-block top">
        <ul className="pages">
          {Object.keys(this.props.pages).map(key => (
            <Page key={key} details={this.props.pages[key]} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
