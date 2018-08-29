import React, { Component } from "react";
import logo from "../logo.svg";
import "../css/App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Preview from "./Preview";

class App extends Component {
  state = {
    pages: {},
    milestones: {}
  };

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
          <Preview />
        </div>
      </div>
    );
  }
}

export default App;
