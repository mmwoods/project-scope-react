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
    console.log('update');
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
    console.log(segmentArray);

    this.setState({
      segments: segmentArray
    });

    function returnTime(input) {
      var hourRegexOb = /(((\d+)(hr|hrs|hour|hours)\b)\s+((\d+)(m|min|mins|minutes)\b))|((\d+)(\s+|)(m|min|mins|minutes)\b)|((\d+)(\s+|)(hr|hrs|hour|hours)\b)|((\d+\.\d+)(hr|hrs|hour|hours))/gm;
      var myArray;
      var result = 0;

      while ((myArray = hourRegexOb.exec(input)) !== null) {
          if (myArray[3] && myArray[6]) result += parseInt(myArray[3]) + myArray[6]/60; // hr 3, min 6
          if (myArray[13]) result += parseInt(myArray[13]); // hours 13
          if (myArray[9]) result += myArray[9]/60; // minutes 9
          if (myArray[17]) result = parseFloat(myArray[17]); // decimal 17

          return result;
      }
      return result;
    }

    function totalHours(input) {
        var total = 0;
        var coding = 0;
        var design = 0;

        for (var i = 0; i < input.length > 0; i++) {
            if (input[i].hours !== undefined) total += input[i].hours;
            if (input[i].type === 'coding') coding += input[i].hours;
            if (input[i].type === 'design') design += input[i].hours;
        }

        return ({
            coding: coding,
            design: design,
            total: total
        });
    }
    function createScope(segmentArray) {
      var scope = segmentArray.map(function(contents) {
          var h2Pattern = new RegExp(/^#{2}\s+((.*)(\s+|\s+`)(\(.*\)))/, 'm');
          var h3Pattern =/^#{3}\s+(.*)/gm;
          var bulletPattern = /^-\s.*/gm;
          var commentPattern = /^((Coding|coding)|(Mockup|mockup|Wireframe|wireframe|Designs|designs|Design|design)|(<!--(\s+|)((Coding|coding)|(Mockup|mockup|Designs|designs|Design|design)).*-->)).*/gm;

          if(h2Pattern.test(contents)) {
              var validPattern = h2Pattern.exec(contents);
              var h2 = validPattern[2]; // Title
          }

          // Creating Sub-Headings Object
          var subHeadingObject = [];
          var subHeadingMatch;

          while ((subHeadingMatch = h3Pattern.exec(contents)) !== null) {
              subHeadingObject.push({
                  line: subHeadingMatch[1],
                  hours: returnTime(subHeadingMatch)
              });
          }

          // Creating Line Object
          var lineMatch = contents.match(bulletPattern);
          if (lineMatch === null) return {};

          let lineObject = lineMatch.map(function(item) {
              return ({
                  line: item,
                  hours: returnTime(item),
                  type: 'coding'
              });
          });

          // Creating Comment Object
          var commentObject = [];
          var commentMatch;

          while ((commentMatch = commentPattern.exec(contents)) !== null) {
              var type  = '';

              if (commentMatch[2] !== undefined || commentMatch[7] !== undefined) type = 'coding';
              if (commentMatch[3] !== undefined || commentMatch[8] !== undefined ) type = 'design';

              commentObject.push({
                  line: commentMatch[0],
                  hours: returnTime(commentMatch),
                  type: type
              });

              var type  = '';
          }

          // Segment Output
          if (h2 !== undefined) {
              return {
                  name: h2,
                  coding: totalHours(commentObject).coding + totalHours(lineObject).coding,
                  design: totalHours(commentObject).design + totalHours(lineObject).design,
                  total: totalHours(commentObject).total + totalHours(lineObject).total,
                  cost: (totalHours(commentObject).total + totalHours(lineObject).total) * 160
              };
          }
      });
      // Removes segments without titles
      for (var i = scope.length - 1; i >= 0; i--) {
          if (scope[i] === undefined) scope.splice(i, 1);
      }
      return scope;
    }
    var scopeArray = createScope(segmentArray);
    console.log(scopeArray);
    this.setState({
      pagesCalculated: scopeArray,
      totals: calculateScopeTotals(scopeArray)
    });

    function calculateScopeTotals(scopeArray) {
      var coding = 0;
      var design = 0;

      for (var i = 0; i < scopeArray.length; i++) {
        var itemCoding = scopeArray[i].coding;
        var itemDesign = scopeArray[i].design;

        if (itemCoding > 0) {
          coding += itemCoding;
        }
        if (itemDesign > 0) {
          design += itemDesign;
        }
      }
      var total = coding + design;
      var cost = total * 160;

      return {
        coding: coding,
        design: design,
        total: total,
        cost: cost
      }
    }
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
          <Header />
          <div className="markdown d-inline-block top">
            <Markdown>{this.state.document}</Markdown>
          </div>
          <div>
            <AceEditor
              mode="markdown"
              theme="ace-chrome"
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
