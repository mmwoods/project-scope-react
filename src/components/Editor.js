import React, { Component } from "react";
import AddScopeContent from "./AddScopeContent";

class Editor extends Component {
  render() {
    return (
      <div className="w-40 d-inline-block top">
        <h2>Editor</h2>
        <AddScopeContent addPage={this.props.addPage} />
      </div>
    );
  }
}

export default Editor;
