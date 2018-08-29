import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAbF8MyfNjvYMzsDVEIKIJ3rdu5jo7MLg4",
  authDomain: "scope-132cc.firebaseapp.com",
  databaseURL: "https://scope-132cc.firebaseio.com",
  projectId: "scope-132cc",
  storageBucket: "scope-132cc.appspot.com",
  messagingSenderId: "873213951616"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
