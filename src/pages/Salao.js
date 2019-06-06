import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Home from "../pages/Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('users').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      userType: this.state.userType
    }
    database.collection('users').add({object})
    alert(this.state.userType)
  }

  
  render() {
    
    return (
      <Router>
      <div className="App">
        <header className="App-header">
         
         <p>Salão</p>
        </header>
      </div>
      </Router>
       
    )
  }
  }



export default withFirebaseAuth({firebaseAppAuth}) (App);