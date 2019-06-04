import React from 'react';
import Button from '../Button'
import firebase from '../firebaseConfig';
// import { database } from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

    handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
  this.props.createUserWithEmailAndPassword(
  this.state.email, this.state.senha)
    .then(() => {
        alert("uhul")
  })
}

  signIn = () => {
    const {email, password} = this.state;
    const { signInWithEmailAndPassword, history: {push} } = this.props; 
    signInWithEmailAndPassword(email, password)
    .then(() => {
    push('/Salao')
    })
  }

  render() {
    return (
      <div>
          <input value={this.state.email}
            placeholder="Digite seu e-mail"
            onChange={(e) => this.handleChange(e, "email")} />
          <input value={this.state.password}
            placeholder="Digite sua senha"
            onChange={(e) => this.handleChange(e, "password")} />
            <Button text="Criar usuário" onClick={this.createUser} />
            <Button text="Login" onClick={this.signIn} />
      </div>
    )
  }
}


export default withFirebaseAuth({
    firebaseAppAuth,
})(Home);
