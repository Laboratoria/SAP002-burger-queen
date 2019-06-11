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
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds(),
      employee: "",
      listOrder: [],
      request: []
    };
  }

  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  newHour = () => {
    function digHour(dig) {
      return (dig < 10) ? '0' + dig : dig;
    }
    const date = new Date()
    let hourNew = [date.getHours()].map(digHour)
    let minNew = [date.getMinutes()].map(digHour)
    let secNew = [date.getSeconds()].map(digHour)
    console.log([date.getSeconds()].map(digHour))
    this.setState({
      hour: hourNew,
      min: minNew,
      sec: secNew
    })
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.newHour(),
      1000
    );
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
      <div className="div-page">
        <h3>Cozinha</h3>
        <p className="name">Funcionário(a): {this.state.employee}</p>
        <p className="name">Horário: {this.state.hour}:{this.state.min}:{this.state.sec}</p>
        <div className="logout">
          <div className="request">
            <Link className="button-logout logout" to="/">Sair</Link>
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            return (<div className="form cozinha" key={index}>
              <p className="menu" >Horário: {item.hour}</p>
              <p className="menu" >Cliente: {item.client}</p>
              <p className="menu" >Funcionário(a): {item.employee}</p>
              <p className="menu">Pedido</p>
              {item.request.map((menu, index) => {
                return <p className="menu" key={index}>-{[menu.name, " ", menu.quantity, " - unid"]}</p>
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