import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateProject from "./CreateProject";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CreateProject} />
      <Route path="/scope/:scopeId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
