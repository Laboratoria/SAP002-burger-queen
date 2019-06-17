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
            user: null
        }
        
    }



    render() {
        return (
            <main className="page">
                <h1>Estamos no salão</h1>
                <button>Sair</button>
            </main>
        )
    }
}

export default Salon