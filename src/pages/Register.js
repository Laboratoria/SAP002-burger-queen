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
        console.log(newState)
    }

    // handleLabel = () => {
    //     console.log("oi");
    // }

    createUser = () => {
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
            const id = resp.user.uid;
            database.collection("users").doc(id).set({
                name: this.state.name,
                email: this.state.email,
                type: this.state.type
            });
        })
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
                        <h4>FAÇA SEU CADASTRO</h4>
                        <Input type="text" placeholder="NOME COMPLETO" onChange={(e) => this.handleChange(e, "name")} value={this.props.name}/>
                        <Input type="email" placeholder="E-MAIL" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                        <Input type="password" placeholder="SENHA" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>

                        <div>
                            <Toggle type="radio" name="toggle" id="saloon" value="saloon" onChange={(e) => this.handleChange(e, "type")} checked="checked"/>
                            <Toggle type="radio" name="toggle" id="kitchen" value="kitchen" onChange={(e) => this.handleChange(e, "type")} />
                            <label className="Toggle">
                                <span></span>
                            </label>
                            <label htmlFor="saloon">SALÃO</label>
                            <label htmlFor="kitchen">COZINHA</label>                           
                        </div>

                    </form>
                    <div className="Align">
                        <Button text="CADASTRAR" onClick={this.createUser}/>
                        <Link to="/login" className="Link">NÃO QUERO ME CADASTRAR AGORA</Link>                
                    </div>
                </section>
            </div>
            )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Register);