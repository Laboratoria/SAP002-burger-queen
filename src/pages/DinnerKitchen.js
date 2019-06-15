import React from 'react';
import firebase from "../firebaseConfig";
// import {Form, Col} from 'react-bootstrap';
// import logo from '../assets/img/logo-large.png';
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();

class DinnerKitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      listItem: []
    };
  }

  handleChange = (event, element) => {
    event.preventDefault();
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }


  render() {
    return (
      <div className="m-5">
        <p>This is the Dinner Kitchen</p>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(DinnerKitchen);

