import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Logo from "../components/Logo";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "",
      firstName: "",
      surname: "",
      condition: true
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    this.setState({
      condition: !this.state.condition
    })
  }

  createUser = () => {
    // const { email, firstName, surname, userType } = this.state;
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        const id = resp.user.uid;
        const user = firebase.auth().currentUser
        database.collection("users").doc(id).set({
          email: this.state.email,
          firstName: this.state.firstName,
          surname: this.state.surname,
          userType: this.state.userType
        });
        user.updateProfile({
          displayName: `${this.state.firstName} ${this.state.surname}`
        })
    })
    .then( () =>{
      this.props.history.push(`/${this.state.userType}`);
    });
  }
   
  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((resp) => {
      const id = resp.user.uid;
      database.collection("users").doc(id).get()
        .then(resp => {
          const data = resp.data();
          this.props.history.push(`/${data.userType}`);
        })
    });
  }

  render() {
    const { email, password, firstName, surname } = this.state;

    return (
      <div>
        <Logo />
        <div className="forms">
               <Tabs>
          <TabList className="nav-container">
            <Tab className={ this.state.condition ? "nav-link active" : "nav-link disabled" }
        onClick={ this.handleClick }> 
              <p>LOGIN</p>
            </Tab>
            <Tab className={ this.state.condition ? "nav-link disabled" : "nav-link active" }
        onClick={ this.handleClick }>   
              <p>CRIAR CONTA</p>
            </Tab>
          </TabList>
          <TabPanel>
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
           <Button text="Login" onClick={this.signIn}/>
          </TabPanel>
          <TabPanel> 
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
            <select className="input-box" onChange={(e) => this.handleChange(e, "userType")}>
			        <option selected disabled>Setor</option>
			        <option value="kitchen" >Cozinha</option>
			        <option value="saloon">Salão</option>
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
          </TabPanel>  
         </Tabs>
        </div>
        </div>
    )
  }
}

export default withFirebaseAuth({firebaseAppAuth}) (Home);