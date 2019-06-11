import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import InitialHeader from '../components/InicialHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

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

    signIn = () => {
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.props.history.push(`/${this.state.type}`)
        })
    }
    
    render() {
        return (
            <div>
                <InitialHeader />
                <section className="Align">
                    <form className="Login-register-form">
                        <h4>FAÇA SEU LOGIN</h4>
                        <Input type="email" placeholder="E-MAIL" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                        <Input type="password" placeholder="SENHA" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>
                    </form>
                    <div className="Align-beside">
                        <p>Mantenha-me conectado</p>
                        <p>Esqueci minha senha</p>
                    </div>
                    <div>
                        <Button text="ENTRAR" onClick={this.signIn}/>
                        <Link to="register" className="Link">NÃO TEM CONTA? CADASTRE-SE</Link>
                    </div>
                </section>
            </div>
                )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Login);