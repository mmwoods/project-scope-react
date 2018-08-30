import React, { Component } from "react";
import Page from "./Page";
import Login from "./Login";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Sidebar extends Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1. Look up the current scope in the firebase database
    console.log(this);
    const scope = await base.fetch(this.props.scopeId, { context: this });
    console.log(scope);
    // 2. Claim it if there is no owner
    if (!scope.owner) {
      // save it as our own
      await base.post(`${this.props.scopeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the Sidebar component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: scope.owner || authData.user.uid
    });
    // console.log(authData);
  };

  authenticate = provider => {
    // console.log(provider);
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    // 1. Check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    // 3. They must be the owner, just render the Sidebar
    return (
      <div className="sidebar-wrapper w-20 d-inline-block top">
        {logout}
        <ul className="pages">
          {Object.keys(this.props.pages).map(key => (
            <Page key={key} details={this.props.pages[key]} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Sidebar;
