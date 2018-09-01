import React, { Component } from "react";
import AddScopeContent from "./AddScopeContent";

class Editor extends Component {
  render() {
    return (
      <div className="card d-inline-block top w-20 pull-right">
        <h2>Editor</h2>
        <AddScopeContent addPage={this.props.addPage} />
      </div>
    );
  }
}

export default Editor;
