import React from 'react';
import firebase from "../firebaseConfig";
// import {Form, Col} from 'react-bootstrap';
import Nav from "../components/nav"
import withFirebaseAuth from 'react-with-firebase-auth';

const firebaseAppAuth = firebase.auth();

class Kitchen extends React.Component {
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
      <div className="p-0 m-0 div-height">
        <Nav
          logout={this.logout}
        />
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Kitchen);

