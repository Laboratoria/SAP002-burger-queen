import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import InitialHeader from '../components/InicialHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import '../components/Components.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }

    async getUser(id) {
        const doc = await database.collection("users").doc(id).get();
        const user = doc.data();
        return user;
    }

    signIn = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            const id = firebaseAppAuth.currentUser.uid;
            this.getUser(id)
            .then((data) => {
                sessionStorage.setItem('user', id);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('type', data.type);
                window.location = '/';
            })
        })
    }
    
    render() {
        return (
            <div>
                <InitialHeader />
                <section className="Align">
                    <form className="Login-register-form">
                        <h4>Faça seu login</h4>
                        <Input type="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                        <Input type="password" placeholder="Senha" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>
                    </form>
                    <div className="Align-beside">
                        <p>Mantenha-me conectado</p>
                        <p>Esqueci minha senha</p>
                    </div>
                    <div  className="Align">
                        <Button text="Entrar" onClick={this.signIn}/>
                        <Link to="register" className="Link">Não tem conta? Cadastre-se</Link>
                    </div>
                </section>
            </div>
                )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Login);