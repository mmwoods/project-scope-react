import React, { Component } from "react";
import logo from "../logo.svg";
import "../css/App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import Preview from "./Preview";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Sidebar />
          <Editor />
          <Preview />
        </div>
      </div>
    );
  }
}

export default App;
