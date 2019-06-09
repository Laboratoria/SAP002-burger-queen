import React from 'react';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      listItem: []
    };
  }

  componentDidMount() {
    event.preventDefault();
    database.collection('login').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleChange = (event, element) => {
    event.preventDefault();
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = (event) => {
    event.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    }
    database.collection('login').add(loginData)
    this.setState({ 
      listItem: this.state.listItem.concat(loginData)
      })
  }


  render() {
    return (
      <div className="m-5">
        <p>This is the Dinner Hall</p>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);