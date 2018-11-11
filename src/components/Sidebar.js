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

  goHome = scopeName => {
    // Change the page
    this.props.history.push(`/`);
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
    const scope = await base.fetch(this.props.scopeId, { context: this });
    // 2. Claim it if there is no owner
    if (!scope.owner) {
      // save it as our own
      await base.post(`scopes/${this.props.scopeId}/owner`, {
        data: authData.user.displayName
      });
    }
    // 3. Set the state of the Sidebar component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: scope.owner || authData.user.uid,
      photo: authData.user.photoURL,
      name: authData.user.displayName
    });
    // 4. Store total users
    await base.post(`users/${authData.user.uid}`, {
      data: {
        name: authData.user.displayName
      }
    });
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
    const logout = (
      <p className="btn" onClick={this.logout}>
        Log Out
      </p>
    );
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
      <div className="sidebar-wrapper w-20 d-inline-block top text-left">
        <p onClick={this.goHome}>Home</p>
        <p onClick={() => this.props.documentSave('v1')}>Save Version</p>
        <img src={this.state.photo} />
        {logout}
        <ul className="pages">
          {Object.keys(this.props.pages).map(key => (
            <Page key={key} details={this.props.pages[key]} />
          ))}
          <div className="single-page">
            <h2 className="page-title d-inline-block base">Total</h2>
            <p>Design: {this.props.totals.design}</p>
            <p>Coding: {this.props.totals.coding}</p>
            <p>Total: {this.props.totals.total}</p>
          </div>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
