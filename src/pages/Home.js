import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
// const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "",
      listItem: [],
      firstName: "",
      surname: ""
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
      }
    )
  }

  render() {
    const { email, password, listItem, firstName, surname } = this.state;

    return (
      <div>
        <header className="forms">     
          <Input 
            type="text" 
            value={firstName} 
            placeholder="Nome"
            onChange={(e) => this.handleChange(e, "firstName")}
         />
         <Input 
            type="text" 
            value={surname} 
            placeholder="Sobrenome"
            onChange={(e) => this.handleChange(e, "surname")}
         />
        <select className="input-box">
			    <option value="" selected disabled hidden>Setor</option>
			    <option value="kitchen" onChange = {(e) => this.handleChange(e, "userType")}>Cozinha</option>
			    <option value="salon" onChange = {(e) => this.handleChange(e, "userType")}>Salão</option>
			  </select>
        <Input 
          type="email" 
          value={email} 
          placeholder="Digite seu email"
          onChange={(e) => this.handleChange(e, "email")} 
        />
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => this.handleChange(e, "password")} 
          placeholder="Digite sua senha"
        />
        <Button text="Criar Conta" onClick={this.createUser}/>
        </header>
      </div>
    )
  }
}

export default withFirebaseAuth({firebaseAppAuth}) (Home);