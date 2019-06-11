import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import menu from "../menu.json"
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: "",
      employee: "",
      client: "",
      listItem: [],
      request: []
    };
  }

  clientOrder = (item) => {
    const itemIndex = this.state.request.findIndex((produto) => {
      return produto.name === item.name
    })
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      }
      this.setState({
        request: this.state.request.concat(newItem)
      })
    } else {
      let newOrder = this.state.request
      newOrder[itemIndex].quantity += 1
      this.setState({
        request: newOrder
      })
    }
  }

  clickDelete = (item) => {
    const itemIndex = this.state.request.findIndex((produto) => {
      return produto.name === item.name
    })
    let newOrder = this.state.request
    newOrder[itemIndex].quantity -= 1
    const quant = newOrder[itemIndex].quantity
    if (quant > 0) {
      this.setState({
        request: newOrder
      })
    } else {
      newOrder.splice(itemIndex, 1)
      this.setState({
        request: newOrder
      })
    }
  }

  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  newHour = () => {
    function hour(dig) {
      return (dig < 10) ? '0' + dig : dig;
    }
    const date = new Date();
    return [date.getHours(), date.getMinutes()].map(hour).join(':');
  }

  handleClick = (request) => {
    const object = {
      hour: this.newHour(),
      employee: this.state.employee,
      client: this.state.client,
      request
    }
    database.collection("order").add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
    this.reset()
  }

  reset = () => {
    this.setState({
      request: [],
      client: ""
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

  render() {
    const valueTotal = this.state.request.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0)

    return (
      <div className="div-page">
        <h3>Salão</h3>
        <p className="name">Funcionário(a): {this.state.employee}</p>
        <div className="logout">
          <div className="request">
            <Link className="button-logout logout" to="/">Sair</Link>
          </div>
        </div>
        <p>Café da manhã</p>
        <div className="home">
          {menu.menu.breakfast.map((item, index) => {
            return <Button className="button-cardap" key={index} onClick={() => this.clientOrder(item)} text={item.name} />
          })
          }
        </div>
        <p>Cardápio do dia</p>
        <div className="home">
          {menu.menu.day.map((item, index) => {
            return <Button className="button-cardap" key={index} onClick={() => this.clientOrder(item)} text={item.name} />
          })
          }
        </div>
        <div className="page">
          <div className="request">
            <h3>Pedido</h3>
            <Input value={this.state.client} placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "client")} />
            <Button className="button" onClick={() => this.handleClick(this.state.request)} text="Criar Pedido" />
            {
              this.state.request.map((item, index) => {
                return <div key={index}>
                  <p>{item.name} - R$ {item.price * item.quantity} - {item.quantity} unid</p>
                  <Button className="button" text="Excluir" onClick={() => this.clickDelete(item)}></Button>
                </div>
              })
            }
            <h3>Valor Total: R$ {valueTotal}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Salao);