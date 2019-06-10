import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import InitialHeader from '../components/InicialHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import {BrowserRouter as Link} from 'react-router-dom';

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
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password);
    }
    
    render() {
        return (
            <div>
            <InitialHeader />
            <section>
                <form>
                    <Input type="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                    <Input type="password" placeholder="Senha" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>
                </form>
                    <Link to="order"><Button text="ENTRAR" onClick={this.signIn}/></Link>
                <Link to="register">AINDA NÃO TEM CONTA? CADASTRE-SE</Link>
            </section>
            </div>
                )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Login);