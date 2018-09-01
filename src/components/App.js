import React, { Component } from "react";
import "../css/App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import base from "../base";
import Markdown from "markdown-to-jsx";
import AceEditor from "react-ace";
import brace from "brace";
import "brace/mode/markdown";
import "brace/theme/solarized_light";

class App extends Component {
  state = {
    pages: {},
    milestones: {},
    document: ""
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.scopeId);
    if (localStorageRef) {
      this.setState({ document: localStorageRef });
    }
    this.ref = base.syncState(`${params.scopeId}/pages`, {
      context: this,
      state: "pages"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.scopeId, this.state.document);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addPage = page => {
    // 1. Take a copy of the existing state (stop mutations)
    const pages = { ...this.state.pages };
    // 2. Add new page to pages variable
    pages[`page${Date.now()}`] = page;
    // 3. Set the new pages object to state
    this.setState({ pages });
  };

  render() {
    return (
      <div className="App">
        <Sidebar
          pages={this.state.pages}
          scopeId={this.props.match.params.scopeId}
        />
        <div className="main-content d-inline-block top w-80">
          <Header />
          <Editor addPage={this.addPage} />
          <div className="markdown d-inline-block top p-35">
            <Markdown>{this.state.document}</Markdown>
          </div>
        </div>
        <AceEditor
          mode="markdown"
          theme="solarized_light"
          name="markdown_editor"
          value={this.state.document}
          onChange={newContent => {
            this.setState({
              document: newContent
            });
          }}
        />
      </div>
    );
  }
}

export default App;
