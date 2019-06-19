import React from 'react';
import Button from '../Button';
import './Salao.css'
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link }
  from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Prontos extends React.Component {
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
          if(doc.data().finishedTime) {
            return {
              data: doc.data(),
              id: doc.id
            }
          }
        }).filter(item => item);
        this.setState({ listItem: doc });
      });
  }

  handleClick = (id) => {
    const now = new Date();
    const hour = now.getHours() + ":" + now.getMinutes()
    database.collection('Pedidos').doc(id).update({
      finishedTime: hour
    })
    //window.location.href = 'prontos'
  }

  render() {
    return (
      <div>
        <Link to="/Cozinha">Voltar</Link>
        <Link to="/">Sair</Link>
        <hr />
        <h3><b>SALÃO - Lista de Pedidos Prontos</b></h3>
        {this.state.listItem.map((item, index) => {
          return <div className="column3" key={index}>
            <p><b>Hora: </b>{item.data.hour}</p>
            <p><b>Func.:</b> {item.data.employee} <br /><b>Cliente:</b> {item.data.client}</p>
            <div>{item.data.listItem.map((item, index) => {
              return <p key={index}>{item.name} - {item.quantity}</p>
            })}
            <p><b>Finalizado: </b>{item.data.finishedTime}</p>
            </div>
            
          </div>
        })}
      </div>

    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Prontos);