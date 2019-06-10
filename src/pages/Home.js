import React from 'react';
import '../App.css';
import "../components/Input.css";
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      displayName: "",
      email: "",
      password: "",
      value: "Cozinha",
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
            const data = resp.data()
            this.props.history.push(`/${data.value}`)
          })
      }).catch((error) => {
        this.setState({
          error: error.message
        })
      })
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
          .then(() => {
            this.props.history.push(`/${value}`)
          })
      }).catch((error) => {
        this.setState({
          error: error.message
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
              <option value="Cozinha">Cozinha</option>
              <option value="Salao">Salão</option>
            </select>
            <p className="error">{this.state.error}</p>
            <Button className="button" onClick={() => this.createUser()} text="Criar usuário" />
            <Button className="button" onClick={() => this.signIn()} text="Login" />
          </div>
        </div>
      </div >
    );
  }
}
export default withFirebaseAuth({ firebaseAppAuth, })(Home);