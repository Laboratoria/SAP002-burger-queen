import React from 'react';
import Button from '../Button';
import './Salao.css'
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link }
  from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Cozinha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      employee: "",
      listItem: []
    };
  }

  componentDidMount() {
    database.collection('Pedidos').get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs.map(doc => {
          if (!doc.data().finishedTime) {
            return {
              data: doc.data(),
              id: doc.id
            }
          }
        })
        .filter(item => item);
        console.log(doc)
        const compare = (a, b) => {
          let firstOrder = parseFloat((a.data.hour).replace(':').replace(/[^\d.-]/g, ''));
          let secondOrder = parseFloat((b.data.hour).replace(':').replace(/[^\d.-]/g, ''));
          if (firstOrder < secondOrder) {
            return -1;
          } else if (firstOrder > secondOrder) {
            return 1;
          } else {
            return 0;
          }
        }
        
        this.setState({ listItem: doc.sort(compare) });
        console.log(doc.sort(compare))
      });
  }

  handleClick = (id) => {
    const now = new Date();
    const hour = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    database.collection('Pedidos').doc(id).update({
      finishedTime: hour
    })
    window.location.href = 'cozinha'
  }

  render() {
    return (
      <div>
        <Link to="/Prontos">Pedidos Prontos</Link>
        <Link to="/">Sair</Link>
        <hr />
        <h3><b>COZINHA - Lista de Pedidos do Dia</b></h3>
        {this.state.listItem.map((item, index) => {
          return <div className="column3" key={index}>
            <p><b>Hora: </b>{item.data.hour}</p>
            <p><b>Func.:</b> {item.data.employee} <br /><b>Cliente:</b> {item.data.client}</p>
            <div>{item.data.listItem.map((item, index) => {
              return <p key={index}>{item.name} - {item.quantity}</p>
            })}
            </div>
            <Button text="Pedido Pronto" onClick={() => this.handleClick(item.id)}></Button>
          </div>
        })}
      </div>

    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Cozinha);
