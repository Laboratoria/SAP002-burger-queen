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
      readyHour: "",
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

        function compare(a, b) {
          let orderOne = parseFloat((a.hour).replace(':').replace(/[^\d.-]/g, ''))
          let orderTwo = parseFloat((b.hour).replace(':').replace(/[^\d.-]/g, ''))
          if (orderOne < orderTwo) {
            return -1;
          } if (orderOne > orderTwo) {
            return 1;
          } else {
            return 0;
          }
        }
        const orderHour = data.sort(compare)
        const orderDate = orderHour.sort(function (a, b) {
          let dateOne = new Date(a.date)
          let dateTwo = new Date(b.date)
          return dateOne - dateTwo
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

  handleClick = (id, index, hour) => {
    // database.collection("order").doc(id).update({
    //   status: "salao",
    //   readyHour: this.newHour()
    // })
    // const item = document.getElementById(index)
    // item.parentNode.removeChild(item)
    let hourNow = this.newHour()
    let secOrder = (hour[0] + hour[1]) * 3600 + (hour[3] + hour[4]) * 60 + (hour[6] + hour[7]) * 1
    let secNow = (hourNow[0] + hourNow[1]) * 3600 + (hourNow[3] + hourNow[4]) * 60 + (hourNow[6] + hourNow[7]) * 1
    let secActual = secNow - secOrder
    console.log(secondsToHms(secActual))
    function secondsToHms(d) {
      d = Number(d);
      const hour = Math.floor(d / 3600);
      const min = Math.floor(d % 3600 / 60);
      const sec = Math.floor(d % 3600 % 60);
      function hourDig(dig) {
        return (dig < 10) ? '0' + dig : dig;
      }
      return [hour, min, sec].map(hourDig).join(":")
    }
  }

  render() {
    return (
      <div className="div-page" >
        <h3>Cozinha</h3>
        <p className="name">Funcionário(a): {this.state.employee}</p>
        <div className="logout">
          <div className="request">
            <Link className="button-logout logout" to="/">Sair</Link>
          </div>
        </div>
        {
          this.state.listOrder.map((item, index) => {
            if (item.status === "kitchen") {
              return (<div id={index} className="form cozinha" key={index}>
                <p className="menu" >Data: {item.date}</p>
                <p className="menu" >Horário: {item.hour}</p>
                <p className="menu" >Cliente: {item.client}</p>
                <p className="menu" >Funcionário(a): {item.employee}</p>
                <p className="menu">Pedido</p>
                {item.request.map((menu, index) => {
                  return <p key={index} className="menu">-{[menu.name, " ", menu.quantity, " - unid"]}</p>
                })
                }
                <Button key={index} className="button" text="Pedido Pronto" onClick={() => this.handleClick(item.id, index, item.hour)}></Button>
              </div>)
            }
          })
        }
      </div >
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Cozinha);