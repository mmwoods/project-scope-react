import React, { Component } from "react";
import logo from "../logo.svg";
import "../css/App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Preview from "./Preview";
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
    this.ref = base.syncState(`${params.scopeId}/pages`, {
      context: this,
      state: "pages"
    });
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
        <Header />
        <div className="container">
          <Sidebar pages={this.state.pages} />
          <Editor addPage={this.addPage} />
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
          <Markdown>{this.state.document}</Markdown>
        </div>
      </div>
    );
  }
}

export default App;
