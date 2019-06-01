import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Cozinha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pedido: "",
      listItem: []
    };
  }
  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  componentDidMount() {
    database.collection("pedidos").get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data())
        this.setState({ listItem: data })
      })
  }


  //clicar valor atual altera no state e no firebase
  handleClick = () => {
    const object = {
      pedido: this.state.pedido
    }
    database.collection("pedidos").add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  render() {
    // console.log(this.props.user)
    return (
      <div>
        <h1>#partiuBurgerQueen</h1>
        <Input value={this.state.pedido} placeholder="Digite seu pedido" onChange={(e) => this.handleChange(e, "pedido")} />
        <button onClick={this.handleClick}>Criar pedido</button>
        {
          this.state.listItem.map((item, index) => {
            return <p key={index}>{item.pedido}</p>
          })
        }
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Cozinha);