import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Cozinha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      listOrder: [],
      request: []
    };
  }
  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  componentDidMount() {
    let user = firebaseAppAuth.currentUser;
    database.collection("users").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (user != null && user.uid === doc.id) {
            let name = doc.data().displayName
            this.setState({
              employee: name
            })
          }
        })
      })
    database.collection("order").get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data())
        this.setState({ listOrder: data })
      })
  }


  //clicar valor atual altera no state e no firebase
  handleClick = () => {
    // const object = {
    //   pedido: this.state.pedido
    // }
    // database.collection("pedidos").add(object)
    // this.setState({
    //   listItem: this.state.listItem.concat(object)
    // })
  }

  // userUid = () => {
  //   let user = firebaseAppAuth.currentUser;
  //   database.collection("users").get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         if (user != null && user.uid === doc.id) {
  //           let name = doc.data().displayName
  //           this.setState({
  //             employee: name
  //           })
  //         }
  //       })
  //     })
  // }

  render() {
    return (
      <div>
        <h3>Cozinha</h3>
        <p className="name">Funcionário(a): {this.state.employee}</p>
        <Link className="button-logout logout" to="/">Sair</Link>
        {
          this.state.listOrder.map((item, index) => {
            return (<div className="form">
              <p className="error" key={index}>Cliente: {item.client}</p>
              <p className="error" key={index}>Funcionário(a): {item.employee}</p>
              <p className="error">Pedido</p>
              {item.request.map((menu) => {
                return <p className="error" key={index}>{[menu.name, " ", menu.quantity, " - unid"]}</p>
              })
              }
            </div>)
          })
        }
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Cozinha);