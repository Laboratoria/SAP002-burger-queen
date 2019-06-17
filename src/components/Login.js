import React, { Component } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            place: "kitchen"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    signIn = (event) => {
        event.preventDefault()
        this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((resp) => {
            const id = resp.user.uid;
            database.collection("users").doc(id).get()
            .then(resp => {
                const data = resp.data();
                this.props.history.push(`/${data.place}`);
            })
    
        });
    }
    

    render() {
        return (
            <main className="page">
                <div className="logo">
                    <h1>Burger</h1>
                    <h3>QUEEN</h3>
                </div>
                <div className="container">
                    <div className="enter">
                        <h2>ENTRAR</h2>
                        <div className="enter-line"></div>
                    </div>
                    <form className="login-form">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" placeholder="Digite seu e-mail" value={this.state.email} onChange={(event) => this.handleChange(event, "email")} />
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" value={this.state.password} onChange={(event) => this.handleChange(event, "password")} />
                        <select name="category">
                            <option value="place" onChange={(event) => this.handleChange(event, "place")}>-- Escolha uma categoria --</option>
                            <option value="kitchen">Cozinha</option>
                            <option value="salon">Salão</option>
                        </select>
                        <input type="submit" value="Entrar" onClick={this.signIn}></input>
                        <div className="signup-link">
                            <Link to="/signup">Não tem cadastro? Entre aqui</Link>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default withFirebaseAuth({
    firebaseAppAuth,
})(Login)