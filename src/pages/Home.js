import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();
// const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "",
      listItem: []
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

 

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password);
  }
   
  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password).then(
      () => {
        alert("uhul");
      }
    )
  }

  render() {
    const { email, password, listItem } = this.state;

    return (
      <div>
        <header className="App-header">
          <input value={email} 
            placeholder="Digite seu email"
            onChange={(e) => this.handleChange(e, "email")}
          />
          <input value={password} 
            placeholder="Digite sua senha"
            onChange={(e) => this.handleChange(e, "password")}
          />
          <input type="radio" name="userType" value="salon"
            onChange = {(e) => this.handleChange(e, "userType")}
          />
          <span>Salão</span>
          <input type="radio" name="userType" value="kitchen"
            onChange = {(e) => this.handleChange(e, "userType")}
          />
          <span>Cozinha</span>
          <Button text="Criar Conta" onClick={this.createUser}/>
          <Button text="Logar" onClick={this.signIn}/>
          <Button text="clique aqui" onClick={this.handleClick}/>
       
        </header>
      </div>
    )
  }
  }

export default withFirebaseAuth({firebaseAppAuth}) (Home);