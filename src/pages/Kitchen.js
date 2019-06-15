import React from 'react'
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth'


const firebaseAppAuth = firebase.auth()

class Kitchen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       
      };
    }
}
  export default withFirebaseAuth({firebaseAppAuth,})(Kitchen);
