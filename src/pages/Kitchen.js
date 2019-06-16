import React from "react";
import "../App.css";
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyHour: "",
      employee: "",
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
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        function compare(a, b) {
          let orderOne = parseFloat((a.hour).replace(':').replace(/[^\d.-]/g, ''));
          let orderTwo = parseFloat((b.hour).replace(':').replace(/[^\d.-]/g, ''));
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

  newHour = () => {
    function hour(dig) {
      return (dig < 10) ? '0' + dig : dig;
    }
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(hour).join(":");
  }

  secondsToHms = (dig) => {
    dig = Number(dig);
    const hour = Math.floor(dig / 3600);
    const min = Math.floor(dig % 3600 / 60);
    const sec = Math.floor(dig % 3600 % 60);
    function hourDig(dig) {
      return (dig < 10) ? '0' + dig : dig;
    }
    return [hour, min, sec].map(hourDig).join(":");
  }

  handleClick = (id, index, hour, day) => {
    const hourNow = this.newHour();
    const dayNow = new Date();
    const daySecOrder = day * 86400;
    const daySecNow = dayNow.getDate() * 86400;
    const secOrder = daySecOrder + (hour[0] + hour[1]) * 3600 + (hour[3] + hour[4]) * 60 + (hour[6] + hour[7]) * 1;
    const secNow = daySecNow + (hourNow[0] + hourNow[1]) * 3600 + (hourNow[3] + hourNow[4]) * 60 + (hourNow[6] + hourNow[7]) * 1;
    const secActual = secNow - secOrder;

    database.collection("order").doc(id).update({
      status: "hall",
      readyHour: this.secondsToHms(secActual)
    });
    const item = document.getElementById(index);
    item.parentNode.removeChild(item);
  }

  signOutLogin = () => {
    firebaseAppAuth.signOut()
  }

  render() {
    return (
      <div className="div-page" >
        <div className="login-name">
          <p className="title">Cozinha - <span className="name">Funcionário(a): {this.state.employee}</span></p>
          <div className="log">
            <div className="request">
              <Link className="button-log log" to="/" onClick={() => this.signOutLogin()}>Sair</Link>
            </div>
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            if (item.status === "kitchen") {
              return (<div id={index} className="form cozinha" key={index}>
                <p className="menu order" >HORÁRIO: {item.hour}</p>
                <p className="menu order" >DATA: {item.day}/{item.month}/{item.year}</p>
                <p className="menu order" >CLIENTE: {item.client}</p>
                <p className="menu order" >FUNCIONÁRIO(A): {item.employee}</p>
                <p className="menu order">PEDIDO {item.order}</p>
                {item.request.map((menu, index) => {
                  return <p key={index} className="menu order">- {[menu.quantity, " unid: ", menu.name, " "]}</p>
                })
                }
                <Button key={index} className="ready button" text="Pedido Pronto" onClick={() => this.handleClick(item.id, index, item.hour, item.day)}></Button>
              </div>)
            }
          })
        }
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Kitchen);