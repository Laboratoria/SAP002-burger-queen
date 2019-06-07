import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Input from '../components/Input';
import Button from '../components/Button';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            tipo: "saloon"
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
                tipo: this.state.tipo
            });
        })
        .then(() => {
            this.props.history.push(`/${this.state.tipo}`)
        })
    }
    
    render() {
        return (
            <section>
            <form>
                <Input type="text" placeholder="Nome completo" onChange={(e) => this.handleChange(e, "name")} value={this.props.name}/>
                <Input type="email" placeholder="E-mail" onChange={(e) => this.handleChange(e, "email")} value={this.props.email}/>
                <Input type="password" placeholder="Senha" onChange={(e) => this.handleChange(e, "password")} value={this.props.password}/>
                
                {/*colocar se é salão ou cozinha*/}

                <select onChange={(e) => this.handleChange(e, "tipo")}>
                    <option value="saloon">SALÃO</option>
                    <option value="kitchen">COZINHA</option>
                </select>

            </form>
                <Button text="CADASTRAR" onClick={this.createUser}/>
                <Link to="/">NÃO QUERO ME CADASTRAR AGORA</Link>                
                </section>
            )
        }
    }

export default withFirebaseAuth({firebaseAppAuth,})(Register);