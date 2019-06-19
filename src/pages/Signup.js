import React from 'react';
import './Home.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import firebaseApp from "../firebaseConfig";
import '../components/Menu.css';
import '../components/Header.css';
import logo from '../assets/logo.png'
import withFirebaseAuth from 'react-with-firebase-auth'

const firebaseAppAuth = firebaseApp.auth();
const database = firebaseApp.firestore();

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      type: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  handleChange = (e, element) => {
    const newState = this.state;
    newState[element] = e.target.value;
    this.setState(newState)
  }

  createUser = () => {
    this.props.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(resp => {
      if (resp) {
        database.collection('users')
          .doc(resp.user.uid)
          .set({
            email: this.state.email,
            name: this.state.name,
            type: this.state.type
          })
          .then(() => {
            this.props.history.push(`/${this.state.type}`)
          });
      }
    })
  }

  render() {
    if (this.props.error) {
      alert(this.props.error)
    }
    return (
      <div className="Home">
        <div className="mx-auto login-container">
          <div className="mx-auto">
            <div className="Home-logo-container justify-content-center mr-1 py-3">
              <figure className="Home-logo">
                <img src={logo} alt="" className="Home-logo-img"></img>
              </figure>
              <h1 className="Home-logo-text">Burger<br></br>Queen</h1>
            </div>
          </div>
          <div className="input-container">
            <div className=" container w-100">
              <br></br>
              <input type="text"
                value={this.state.name}
                placeholder="Nome"
                onChange={(e) => this.handleChange(e, "name")}
                className="Home-input mx-auto p-1 my-2 row">
              </input>
              <input type="text"
                value={this.state.email}
                placeholder="E-mail"
                onChange={(e) => this.handleChange(e, "email")}
                className="Home-input mx-auto p-1 my-2 row">
              </input>
              <input type="password"
                value={this.state.password}
                placeholder="Senha"
                onChange={(e) => this.handleChange(e, "password")}
                className="Home-input mx-auto p-1 my-2 row">
              </input>

              <select className="Signup-select mx-4" onChange={(e) => this.handleChange(e, "type")}>
                <option>Tipo de usuário</option>
                <option value="salao">Salão</option>
                <option value="cozinha">Cozinha</option>

              </select>
            </div>
          </div>
          <div className="enter" onClick={this.createUser}>
            <p className="py-4 m-0 text-center">Cadastrar</p>
          </div>
        </div>

      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Signup);
