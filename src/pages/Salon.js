import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Salon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
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
    const { customerName } = this.state;
    const user = firebase.auth().currentUser;
    console.log(user)
    console.log(user.displayName);

    return (
      <div className="App">
        <header className="App-header">
        
         
         <p>Salão</p>
         <p>{user.displayName}</p>
         <Input 
              type="text" 
              value={customerName} 
              placeholder="Digite o nome do cliente"
              onChange={(e) => this.handleChange(e, "customerName")} 
            />
        </header>
      </div>       
    )
  }
  }



export default withFirebaseAuth({firebaseAppAuth}) (Salon);