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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  signIn = () => {
    const { email, password } = this.state;
    this.props.signInWithEmailAndPassword(email, password)
      .then(resp => {
        const id = resp.user.uid;
        database.collection("users").doc(id).get()
          .then((resp) => {
            const data = resp.data();
            this.props.history.push(`/${data.value}`);
          })
      }).catch(() => {
        this.setState({
          error: this.props.error
        })
      })
  }

  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <div className="page">
          <div className="form">
            <Input value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
            <Input type="password" value={this.state.password} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "password")} />
            <p className="error">{this.state.error}</p>
            <Button className="button login" onClick={() => this.signIn()} text="Login" />
            <Link className="link" to="/Create">Não possui cadastro? Crie seu usuário</Link>
          </div>
        </div>
      </div>
    );
  }
}
export default withFirebaseAuth({ firebaseAppAuth, })(Home);