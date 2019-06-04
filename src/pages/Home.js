import React from 'react';
import '../App.css';
import "../components/Input.css";
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import addUser from '../firebase/firestore'

const firebaseAppAuth = firebase.auth()

class Home extends React.Component {
  auth = undefined
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this)
    this.state = {
      user: undefined,
      displayName: "",
      email: "",
      senha: "",
      value: "Cozinha",
      redirect: false,
      error: ""
    };
  }

  componentDidMount() {
    this.auth = firebase.auth()
    this.auth.onAuthStateChanged((signedUser) => {
      if (signedUser) {
        this.setState({
          user: signedUser
        })
        localStorage.setItem('firebase-auth', this.state.user)
        console.log(signedUser.email, signedUser.uid, signedUser.displayName)
      } else {
        this.setState({
          user: undefined
        })
        localStorage.removeItem('firebase-auth')
      }
    })
  }

  signIn = (e) => {
    e.preventDefault()
    this.auth.signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then(signedUser => {
        this.setState({
          user: signedUser,
          redirect: true
        })
      }).catch((error) => {
        this.setState({
          error: error.message
        })
      })
  }
  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  createUser = () => {
    const { email, senha, displayName } = this.state;
    debugger;
    this.props.createUserWithEmailAndPassword(email, senha)
      .then((data) => {
        console.log(data)
        if (!data) {
          console.log('asjdjas')
          return;
        };
        const { user: { uid } } = data;
        addUser({
          email,
          displayName,
        }, uid)
      })
  }

  authLogin = () => {
    if (this.state.value === "Cozinha" && this.state.redirect) {
      return <Redirect to="/Cozinha" />
    } if (this.state.value === "Salao" && this.state.redirect) {
      return <Redirect to="/Salao" />
    }
  }

  render() {
    return (
      <div>
        <Input value={this.state.displayName} placeholder="Digite seu nome" onChange={(e) => this.handleChange(e, "displayName")} />
        <Input value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
        <Input type="password" value={this.state.senha} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "senha")} />
        <select onChange={(e) => this.handleChange(e, "value")} className="input" value={this.state.value}>
          <option value="Cozinha">Cozinha</option>
          <option value="Salao">Salão</option>
        </select>
        <Button onClick={this.createUser} text="Criar usuário" />
        {this.authLogin()}
        <Button onClick={this.signIn} text="Login" />
        <span>{this.state.error}</span>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Home);