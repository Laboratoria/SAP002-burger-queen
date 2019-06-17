import React from "react";
import "../App.css";
import firebase from "../firebaseConfig";
import Button from "../components/Button";
import withFirebaseAuth from "react-with-firebase-auth";
import { Link } from "react-router-dom";

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

  hoursToSeconds = (hour) => {
    return (hour[0] + hour[1]) * 3600 + (hour[3] + hour[4]) * 60 + (hour[6] + hour[7]) * 1;
  }

  handleClick = (id, index, hour) => {
    const hourNow = this.newHour();
    const date = new Date(null);
    date.setSeconds(this.hoursToSeconds(hourNow) - this.hoursToSeconds(hour))
    const secondsToHms = date.toISOString().substr(11, 8);
    database.collection("order").doc(id).update({
      status: "hall",
      time: hourNow,
      readyHour: secondsToHms,
      number: index + 1
    });
    const item = document.getElementById(index);
    item.parentNode.removeChild(item);
  }

  signOutLogin = () => {
    firebaseAppAuth.signOut()
    this.props.history.push(`/`)
  }

  render() {
    return (
      <div className="div-page" >
        <div className="login-name">
          <p className="title">Cozinha - <span className="name">Funcionário(a): {this.state.employee}</span></p>
          <div className="log">
            <div className="request">
              <Button className="button-log log" text="Sair" onClick={this.signOutLogin} />
            </div>
            <Link className="button-log log" to="/List">Lista de Pedidos Prontos</Link>
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            if (item.status === "kitchen") {
              return (<div id={index} className="form cozinha" key={index}>
                <p className="menu number">NÚMERO DO PEDIDO: {index + 1} </p>
                <p className="menu">DATA: {[item.day, "/", item.month, "/", item.year]} - HORÁRIO: {item.hour} </p>
                <p className="menu">CLIENTE: {item.client}</p>
                <p className="menu">FUNCIONÁRIO(A): {item.employee}</p>
                <p className="menu">PEDIDO {item.order}</p>
                {item.request.map((menu, index) => {
                  return <p key={index} className="menu">- {[menu.quantity, " unid: ", menu.name, " "]}</p>
                })
                }
                <Button key={index} className="ready button" text="Concluído" onClick={() => this.handleClick(item.id, index, item.hour)} />
              </div>)
            }
          })
        }
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Kitchen);