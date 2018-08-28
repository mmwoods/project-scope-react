import React from "react";
import { render } from "react-dom";
import "./css/App.css";
import Router from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";

render(<Router />, document.getElementById("root"));
registerServiceWorker();
