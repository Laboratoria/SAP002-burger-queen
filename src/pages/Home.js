import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const firebaseAppAuth = firebase.auth()

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      usuário: ""
    };
  }
  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then(() => {
        console.log('teste')
      })
  }

  // auth = (props) => {
  //   if (props.user) {
  //     return <Redirect to="/Salao" />
  //   }
  //   return null;
  // }

  render() {
    console.log(this.props.user)
    return (
      <div>
        <h1>#partiuBurgerQueen</h1>
        <Input value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
        <Input value={this.state.senha} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "senha")} />
        <Input value={this.state.usuario} placeholder="Digite seu nome" onChange={(e) => this.handleChange(e, "usuario")} />
        <button onClick={this.createUser}>Criar usuário</button>
        <button onClick={this.signIn}>Login</button>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Home);