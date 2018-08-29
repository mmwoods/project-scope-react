import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProjectManager from "./ProjectManager";
import App from "./App";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ProjectManager} />
      <Route path="/scope/:scopeId" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
