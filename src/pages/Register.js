import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import InitialHeader from '../components/InicialHeader';
import Input from '../components/Input';
import Toggle from '../components/Toggle'
import Button from '../components/Button';
import '../components/Components.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            type: "saloon"
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
            const id = resp.user.uid;
            database.collection("users").doc(id).set({
                name: this.state.name,
                email: this.state.email,
                type: this.state.type
            });
            sessionStorage.setItem('user', id);
            sessionStorage.setItem('name', this.state.name);
            sessionStorage.setItem('type', this.state.type);
        })
        .then(() => {
            window.location = '/';
        })
    }
    
    render() {
        return (
            <>
                <InitialHeader />
                <section className="Align">
                    <form className="Login-register-form">
                        <h4>Faça seu cadastro</h4>
                        <Input type="text" placeholder="Nome completo" onChange={(e) => this.handleChange(e, "name")} value={this.props.name}/>
                        <Input type="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                        <Input type="password" placeholder="Senha" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>

                        <div>
                            <Toggle />                        
                        </div>

                    </form>
                    <div className="Align">
                        <Button  className="Button" text="Cadastrar" onClick={this.createUser}/>
                        <Link to="/login" className="Link-voltar">Voltar</Link>                
                    </div>
                </section>
            </>
            )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Register);