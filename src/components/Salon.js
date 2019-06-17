import React, { Component } from 'react'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'

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
        }
    }

    

    logoutUser = (event) => {
        event.preventDefault()
        firebase.auth().signOut()
        .then(function() {
        // Sign-out successful.
        })
        .catch(function(error) {
        // An error happened
        });
    }

    render() {
        return (
            <main className="page">
                <h1>Estamos no salão</h1>
                <button onClick={this.logoutUser}>Sair</button>
            </main>
        )
    }
}

export default withFirebaseAuth({
    firebaseAppAuth,
})(Salon)