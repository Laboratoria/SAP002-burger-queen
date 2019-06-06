import React from 'react';
import Button from '../Button';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link}
from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banana: "",
      peixinho: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('Pedidos').get()
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

  handleClick = () => {
    const object = {
      banana: this.state.banana,
      peixinho: this.state.peixinho
    }
    database.collection('Pedidos').add(object)   
    this.setState({
      listItem:  this.state.listItem.concat(object)   
    })
  }

 

  render() {
    //console.log(this.props.user);
    return (
      <div>
          <input value={this.state.banana}
            placeholder="banana"
            onChange={(e) => this.handleChange(e, "banana")} />
          <input value={this.state.peixinho}
            placeholder="peixinho"
            onChange={(e) => this.handleChange(e, "peixinho")} />
          <Button text="ClickBP" onClick={this.handleClick} />

          {
            this.state.listItem.map((item, index) => {
              return <p key={index}>
              {item.banana} | {item.peixinho}</p>
            })
          }
      </div>
    );
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(App);


//<Link to="teste link">Oiii</Link>