import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScopeManager from "./ScopeManager";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ScopeManager} />
      <Route path="/scope/:scopeId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
