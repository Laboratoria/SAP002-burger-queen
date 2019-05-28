import React from 'react';
import './App.css';
import Input from './components/Input';
import firebase from "./firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
const firebaseAppAuth = firebase.auth();



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      email: "",
      password: ""
    };
  }

  handleChange = (event, type) => {
    const state = this.state;
    state[type] = event.target.value;
    this.setState(state);
  }

  addThing = () => {
    const db = firebase.firestore();
    db.collection("things").add({
      text: this.state.value
    });
  }

  createUser = (e) => {
    e.preventDefault();
    const { createUserWithEmailAndPassword } = this.props;
    const { email, password } = this.state;
    createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
  }

  logIn = (e) => {
    e.preventDefault();
    const { signInWithEmailAndPassword } = this.props;
    const { email, password } = this.state;
    signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
  }

  logout = (e) => {
    e.preventDefault();
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route path="/" exact render={
              () => <Index {...this.state}
                user={this.props.user}
                handleChange={this.handleChange}
                addThing={this.addThing}
                logout={this.logout}
                logIn={this.logIn}
                createUser={this.createUser} />}
            />
            <Route path="/hall" render={() => <Logged
              user={this.props.user}
              logout={this.logout} />}/>
          </header>
        </div>
      </Router>
    );
  }
}

function AuthVerify(props) {
  if (props.user) {
    return <Redirect to="/hall" />
  }
  return null;
}

function Logged(props) {
  if (props.user) {
    return (
      <React.Fragment>
        <h1>Você está logado</h1>
        <button onClick={props.logout}>Sair</button>
      </React.Fragment>
    )
  }
  return <Redirect to="/" />;
}

function Index(props) {
  return (
    <React.Fragment>
      <AuthVerify user={props.user} />
      <form>
        <h1>User</h1>
        <Input onChange={(e) => props.handleChange(e, "email")} value={props.email} />
        <Input onChange={(e) => props.handleChange(e, "password")} value={props.password} />
        <button onClick={props.createUser}>Cria</button>
        <button onClick={props.logIn}>Loga</button>
      </form>
      <Input onChange={(e) => props.handleChange(e, "value")} value={props.value} />
      <button onClick={props.addThing}>Cliqe</button>

    </React.Fragment>
  )
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
