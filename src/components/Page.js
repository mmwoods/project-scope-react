import React, { Component } from "react";

class Page extends Component {
  render() {
    const { name, design, coding, total } = this.props.details;
    return (
      <div className="single-page">
        <h2 class="section-title">{name}</h2>

        <div class="menu-row mb-2">
          <p>
            <span class="blue-colour">Design</span>{" "}
            <span class="pull-right">{design}</span>
          </p>
        </div>

        <div class="menu-row mb-2">
          <p>
            <span class="yellow-colour">Coding</span>{" "}
            <span class="pull-right">{coding}</span>
          </p>
        </div>

        <div class="menu-row mb-2">
          <p>
            <span class="purple-colour">Total</span>{" "}
            <span class="pull-right">{total}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Page;
