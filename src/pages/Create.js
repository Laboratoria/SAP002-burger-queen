import React from "react";
import "../App.css";
import "../components/Input.css";
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from "react-with-firebase-auth";
import { Link } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      value: "Kitchen",
      error: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  createUser = () => {
    const { email, password, displayName, value } = this.state;
    this.props.createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const id = resp.user.uid;
        database.collection("users").doc(id).set({
          email,
          displayName,
          value
        })
        this.props.history.push(`/${value}`);
      }).catch(() => {
        this.setState({
          error: this.props.error
        })
      })
  }

  render() {
    return (
      <div>
        <div className="page">
          <div className="form">
            <Input value={this.state.displayName} placeholder="Digite seu nome" onChange={(e) => this.handleChange(e, "displayName")} />
            <Input value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
            <Input type="password" value={this.state.password} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "password")} />
            <select onChange={(e) => this.handleChange(e, "value")} className="input" value={this.state.value}>
              <option value="Kitchen">Cozinha</option>
              <option value="Hall">Salão</option>
            </select>
            <p className="error">{this.state.error}</p>
            <Button className="button login" onClick={() => this.createUser()} text="Criar Usuário" />
            <Link className="link" to="/">Já possui cadastro? Faça seu Login</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withFirebaseAuth({ firebaseAppAuth, })(Create);