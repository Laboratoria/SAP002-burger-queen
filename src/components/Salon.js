import React, { Component } from 'react'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import { Link } from 'react-router-dom'
import './Salon.css'

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Salon extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            place: "kitchen",
            listItem: []
        };
    }

    

    logoutUser = (event) => {
        console.log("teste", this.props)
        event.preventDefault()
        this.props.signOut()
        .then(() => {
            this.props.history.push('/')
        // Sign-out successful.
        })
        .catch(function(error) {
        // An error happened
        });
    }

    render() {
        return (
            <main className="salon-page">
                <div className="container">
                    <div className="salon-header">
                        <h1>Salão</h1>
                        <button onClick={this.logoutUser}>Sair</button>
                    </div>
                </div>
            </main>
        )
    }
}






export default withFirebaseAuth({
    firebaseAppAuth,
})(Salon)