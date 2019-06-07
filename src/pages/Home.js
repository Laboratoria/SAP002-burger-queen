import React from 'react';
import '../App.css';
import "../components/Input.css";
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
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
      password: "",
      value: "",
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
    const { email, password } = this.state;
    this.auth.signInWithEmailAndPassword(email, password)
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
    const { email, password, displayName, value } = this.state;
    this.props.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        if (!data) {
          return;
        };
        const { user: { uid } } = data;
        addUser({
          email,
          displayName,
          value,
        }, uid)
        this.setState({
          redirect: true
        })
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
        <div className="page">
          <div className="form">
            <Input value={this.state.displayName} placeholder="Digite seu nome" onChange={(e) => this.handleChange(e, "displayName")} />
            <Input value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
            <Input type="password" value={this.state.password} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "password")} />
            <span>{this.state.error}</span>
            <select onChange={(e) => this.handleChange(e, "value")} className="input" value={this.state.value}>
              <option value="Cozinha">Cozinha</option>
              <option value="Salao">Salão</option>
            </select>
            <Button className="button" onClick={this.createUser} text="Criar usuário" />
            {this.authLogin()}
            <Button className="button" onClick={this.signIn} text="Login" />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Home);