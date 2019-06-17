import React from "react";
import "../App.css";
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      value: "",
      listOrder: [],
      request: []
    };
  }

  componentDidUpdate() {
    const user = firebaseAppAuth.currentUser;
    database.collection("users").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (user != null && user.uid === doc.id) {
            const name = doc.data().displayName;
            const local = doc.data().value;
            this.setState({
              employee: name,
              value: local
            })
          }
        })
      })
  }

  componentDidMount() {
    database.collection("order").get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        function compare(a, b) {
          let orderOne = parseFloat((a.time).replace(':').replace(/[^\d.-]/g, ''));
          let orderTwo = parseFloat((b.time).replace(':').replace(/[^\d.-]/g, ''));
          if (orderOne < orderTwo) {
            return -1;
          } if (orderOne > orderTwo) {
            return 1;
          } else {
            return 0;
          }
        }
        const orderHour = data.sort(compare);
        const orderDate = orderHour.sort(function (a, b) {
          let dateOne = new Date(a.month + "/" + a.day + "/" + a.year);
          let dateTwo = new Date(b.month + "/" + b.day + "/" + b.year);
          return dateOne - dateTwo;
        })
        this.setState({
          listOrder: orderDate
        })
      })
  }

  signOutLogin = () => {
    firebaseAppAuth.signOut()
    this.props.history.push(`/`)
  }

  returnPage = () => {
    this.props.history.push(`/${this.state.value}`)
  }

  render() {
    return (
      <div className="div-page" >
        <div className="login-name">
          <p className="title">Pedidos Prontos - <span className="name">Funcionário(a): {this.state.employee}</span></p>
          <div className="log">
            <div className="request">
              <Button className="button-log log" text="Sair" onClick={this.signOutLogin} />
            </div>
            <Button className="button-log log" text="Voltar" onClick={this.returnPage} />
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            if (item.status === "hall") {
              return (<div id={index} className="form cozinha" key={index}>
                <p className="menu number">NÚMERO DO PEDIDO: {item.number} </p>
                <p className="menu">DATA: {[item.day, "/", item.month, "/", item.year]} - HORÁRIO: {item.hour}</p>
                <p className="menu">TEMPO DE PREPARO: {item.readyHour}</p>
                <p className="menu">CLIENTE: {item.client}</p>
                <p className="menu">FUNCIONÁRIO(A): {item.employee}</p>
                <p className="menu">PEDIDO {item.order}</p>
                {item.request.map((menu, index) => {
                  return <p key={index} className="menu">- {[menu.quantity, " unid: ", menu.name, " "]}</p>
                })
                }
              </div>)
            }
          })
        }
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(List);