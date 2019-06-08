import React from "react";
import firebase from "../firebaseConfig";
import { Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseAppAuth = firebase.auth();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (event, elem) => {
    const newState = this.state;
    newState[elem] = event.target.value;
    this.setState(newState);
  };

  createUser = () => {
    this.props.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    );
  };

  signIn = () => {
    this.props
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        alert("uhul");
      });
  };

  render() {
    return (
      <div>
        <h1>#BurgerQueen</h1>
        <input
          value={this.state.email}
          placeholder="Digite seu email"
          onChange={e => this.handleChange(e, "email")}
        />
        <input
          value={this.state.password}
          placeholder="Digite sua senha"
          onChange={e => this.handleChange(e, "password")}
        />
        <Button variant="warning" onClick={this.signIn}>
          Entrar
        </Button>
        <Button variant="warning" onClick={this.createUser}>
          Cadastrar-me
        </Button>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth })(Login);
