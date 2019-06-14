import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      listItem: [],
      };
    }

  componentDidMount() {
    database.collection('orders').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({...doc.data()}));
        this.setState({ listItem: data });
        console.log(data)
        });

      }

      render() {

    
      return <React.Fragment>
            <h1>{
            
            }</h1> 
        </React.Fragment>

      }
  
}


export default Kitchen