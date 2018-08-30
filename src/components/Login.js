import React from "react";

const Login = props => (
  <nav className="login">
    <h2>Login</h2>
    <p>Sign in to manage scopes</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Login with Github
    </button>
  </nav>
);

export default Login;
