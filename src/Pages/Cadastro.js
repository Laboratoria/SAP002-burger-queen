import React from 'react';
import Button from '../Button';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link }
    from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            place: "salao",
        };
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    createUser = () => {
        this.props.createUserWithEmailAndPassword
            (this.state.email, this.state.password)
            .then((resp) => {
              const id = resp.user.uid;
                if(resp) {
                database.collection("users").doc(id).set({
                        email: this.state.email,
                        name: this.state.name,
                        place: this.state.place
                    })
                    .then(() => {
                        this.props.history.push(`/${this.state.place}`);
                    });
                }
            })
            
    }

    render() {
        if (this.props.error){
            if(this.props.error === "The email address is already in use by another account.") {
                alert("Atenção!! E-mail já cadastrado.");
            }
        
        }

        return (
            <div>
                <h1>Cadastro</h1>
                <input value={this.state.name}
                    placeholder="nome"
                    onChange={(e) => this.handleChange(e, "name")} />
                <input value={this.state.email}
                    placeholder="e-mail"
                    onChange={(e) => this.handleChange(e, "email")} />
                <input type="password" value={this.state.password}
                    placeholder="senha"
                    onChange={(e) => this.handleChange(e, "password")} /> <br></br>
                <select onChange={(e) => this.handleChange(e, "place")} >
                    <option value="salao">Salão</option>
                    <option value="cozinha">Cozinha</option>
                </select>
                <Button text="Cadastrar" onClick={this.createUser} /><br></br>
                <Link to="/">Sair</Link>
            </div>
        );
    }
}


export default withFirebaseAuth({
    firebaseAppAuth,
})(App);
