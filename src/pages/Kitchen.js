import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

function Kitchen() {
    return (
        <h1>É a cozinha</h1>
    )
}

export default Kitchen