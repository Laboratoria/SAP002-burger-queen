import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth'
import { BrowserRouter as Redirect } from "react-router-dom";

const firebaseAppAuth = firebase.auth()

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password: "", 
    
    };
  }

changeState = (event, element) => {
  const newState = this.state;
  newState[element] = event.target.value
  this.setState(newState);
}

createUser = () => {
  this.props.createUserWithEmailAndPassword(this.state.email, this.state.password);
}

signIn = () => {
  this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
   .then(() => {
    return <Redirect to="/Hall" />
   });
}

  render() {
    return (
      <div>
          <h1>#partiuBurgerQueen</h1>
          <input value = {this.state.email} onChange={(e) => this.changeState(e,"email")}
        placeholder = "Seu e-mail" />
          <input value = {this.state.password} onChange={(e) => this.changeState(e,"password")}
        placeholder = "Sua senha" />
          <Button text = "Criar usuário" onClick={this.createUser} />
          <Button text = "Entrar" onClick={this.signIn} />
      </div>
    );
  }
}

export default withFirebaseAuth({firebaseAppAuth,})(Login);
