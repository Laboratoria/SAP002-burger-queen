import React, { Component } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'


const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()


class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            place: "kitchen"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        database.collection('laboratoria').get()
        .then((querySnapshot) => {
            const data = querySnapshot.docs.map(doc => doc.data());
            this.setState({ listItem: data });
        });
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    createUser = (event) => {
        event.preventDefault()
        this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
            if (resp) {
            const id = resp.user.uid;
            database.collection("users").doc(id).set({
                email: this.state.email,
                place: this.state.place
            })
            .then(() => {
                this.props.history.push(`/${this.state.place}`);
            });
        }
    })
    }

    render() {
        if (this.props.error) {
            if (this.props.error === "The email address is already in use by another account.") {
            alert("O seu email já está cadastrado");
            } else {
            alert(this.props.error)
            }
        }
        return (
            <main className="page">
                <div className="signup-logo">
                    <h1>Burger</h1>
                    <h3>QUEEN</h3>
                </div>
                <div className="signup-container">
                    <div className="signup">
                        <h2>CADASTRAR</h2>
                        <div className="signup-line"></div>
                    </div>
                    <form className="login-form">
                        <label for="email">Endereço de e-mail</label>
                        <input type="text" id="email" name="email" placeholder="Digite seu e-mail" value={this.state.email} onChange={(event) => this.handleChange(event, "email")} />
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" value={this.state.password} onChange={(event) => this.handleChange(event, "password")} />
                        <label for="password">Confirmar Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" />
                        <select name="place" onChange={(event) => this.handleChange(event, "place")} >
                            <option value="">-- Escolha uma categoria --</option>
                            <option value="kitchen">Cozinha</option>
                            <option value="salon">Salão</option>
                        </select>
                        <input type="submit" value="Cadastrar" onClick={this.createUser}></input>
                        <div className="signup-link">
                            <Link to="/">Já Tem Cadastro? Entre Aqui</Link>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

export default withFirebaseAuth({
    firebaseAppAuth,
})(Signup)