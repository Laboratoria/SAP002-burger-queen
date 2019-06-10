import React from 'react';
import Button from '../Button';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link}
from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Cozinha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banana: "",
      peixinho: "",
      listItem: []
    };
  }

  // componentDidMount() {
  //   database.collection('Pedidos').get()
  //   .then((querySnapshot) => {
  //     const data = querySnapshot.docs.map(doc => doc.data());
  //     this.setState({ listItem: data });
  //   });
  // }

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
    
    return (
      <div>
          <h1>C O Z I N H A</h1>
          <input value={this.state.banana}
            placeholder="preparar"
            onChange={(e) => this.handleChange(e, "banana")} />
          {/* <input value={this.state.peixinho}
            placeholder="peixinho"
            onChange={(e) => this.handleChange(e, "peixinho")} /> */}
            <br></br>
          <Button text="Pedido Pronto" onClick={this.handleClick} /><br></br>
          <Link to="/">Sair</Link>

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
})(Cozinha);
