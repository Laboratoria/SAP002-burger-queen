import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Input from '../components/Input';
import Button from '../components/Button';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // displayName: "",
            email: "",
            password: ""
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.password);
    }
    
    render() {
        return (
            <form>
                {/* <Input type="text" placeholder="Nome completo" onChange={(e) => this.handleChange(e, "displayName")} value={this.props.displayName}/> */}
                <Input type="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                <Input type="password" placeholder="Senha" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>
                
                {/*colocar se é salão ou cozinha*/}

                <Button text="CADASTRAR" onClick={this.createUser}/>
            </form>
            )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Register);