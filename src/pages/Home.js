import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
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
      listItem: []
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

 

  createUser = () => {
    // event.preventDefault()
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password);
  }
   
  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password).then(
      () => {
        // <Redirect to="/Salao" />;
      }
    )
  }

  render() {
    const { email, password, listItem } = this.state;

    return (
      <div>
        <header className="forms">
        
           <select className="input-box">
			  <option value="" selected disabled hidden>Setor</option>
			  <option value="kitchen" onChange = {(e) => this.handleChange(e, "userType")}>Cozinha</option>
			  <option value="salon" onChange = {(e) => this.handleChange(e, "userType")}>Salão</option>
			</select>
          <input
            className="input-box" 
            value={email} 
            placeholder="Digite seu email"
            onChange={(e) => this.handleChange(e, "email")}
          />
          <input 
          className="input-box" 
          value={password} 
            placeholder="Digite sua senha"
            onChange={(e) => this.handleChange(e, "password")}
          />  
          <Button text="Criar Conta" onClick={this.createUser}/>
       
        </header>
      </div>
    )
  }
  }

export default withFirebaseAuth({firebaseAppAuth}) (Home);