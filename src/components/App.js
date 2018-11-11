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
import { createScope, calculateScopeTotals } from "../helpers";

class App extends Component {
  state = {
    pages: {},
    pagesCalculated: {},
    milestones: {},
    document: "",
    segments: {},
    totals: {
      coding: 0,
      design: 0,
      total: 0,
      cost: 0
    }
  };


  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.scopeId);
    if (localStorageRef) {
      this.setState({ document: localStorageRef });
    }
    this.ref = base.syncState(`scopes/${params.scopeId}/pages`, {
      context: this,
      state: "pagesCalculated"
    });
    this.ref = base.syncState(`scopes/${params.scopeId}/totals`, {
      context: this,
      state: "totals"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.scopeId, this.state.document);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  documentSave = async versionNumber => {
    const { params } = this.props.match;
    // 3. Store document
    await base.post(`documents/${params.scopeId}/`, {
      data: {
        content: this.state.document
      }
    });
  };

  addPage = page => {
    // 1. Take a copy of the existing state (stop mutations)
    const pages = { ...this.state.pages };
    // 2. Add new page to pages variable
    pages[`page${Date.now()}`] = page;
    // 3. Set the new pages object to state
    this.setState({ pages });
  };

  onEditorChange(content) {
    this.setState({
      document: content
    });

    const segmentArray = content.split('---');

    this.setState({
      segments: segmentArray
    });

    var scopeArray = createScope(segmentArray);

    this.setState({
      pagesCalculated: scopeArray,
      totals: calculateScopeTotals(scopeArray)
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          scopeId={this.props.match.params.scopeId}
          pages={this.state.pagesCalculated}
          totals={this.state.totals}
          history={this.props.history}
          documentSave={this.documentSave}
        />
        <div className="main-content d-inline-block top w-80">
          <Header scopeId={this.props.match.params.scopeId}/>
          <div className="markdown d-inline-block top">
            <Markdown>{this.state.document}</Markdown>
          </div>
          <div>
            <AceEditor
              mode="markdown"
              theme="chrome"
              name="markdown_editor"
              height='calc(100vh - 70px)'
              width= '50%'
              wrapEnabled= {true}
              value={this.state.document}
              onChange={newContent => {
                this.onEditorChange(newContent)
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
