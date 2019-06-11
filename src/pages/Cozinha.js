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
    console.log(minNew)
    this.setState({
      hour: hourNew,
      min: minNew
    })
  }

  componentDidUpdate() {
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
  }

  componentDidMount() {
    database.collection("order").get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        this.setState({ listOrder: data })
      })
  }


  handleClick = (id) => {
    database.collection("order").doc(id).update({
      status: "salao"
    })
  }

  render() {

    return (
      <div className="div-page" >
        <h3>Cozinha</h3>
        <p className="name">Funcionário(a): {this.state.employee}</p>
        <p className="name">Horário: {this.state.hour}:{this.state.min}</p>
        <div className="logout">
          <div className="request">
            <Link className="button-logout logout" to="/">Sair</Link>
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            if (item.status === "kitchen") {
              return (<div className="form cozinha" key={index}>
                <p className="menu" >Horário: {item.hour}</p>
                <p className="menu" >Cliente: {item.client}</p>
                <p className="menu" >Funcionário(a): {item.employee}</p>
                <p className="menu">Pedido</p>
                {item.request.map((menu, index) => {
                  return <p key={index} className="menu">-{[menu.name, " ", menu.quantity, " - unid"]}</p>
                })
                }
                <Button className="button" text="Pedido Pronto" onClick={() => this.handleClick(item.id)}></Button>
              </div>)
            }
          })
        }
      </div >
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Cozinha);