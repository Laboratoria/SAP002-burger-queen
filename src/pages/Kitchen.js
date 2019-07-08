import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import Logo from "../components/Logo";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      listItem: []
      };
    }

    componentDidMount() {
      database.collection('orders').get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

          this.setState({ listItem: data });
          console.log(data)
          console.log(this.state.listItem)
        });
    }

    render() {
      const orders = this.state.listItem;
      return (
          <div>
             <Logo />
             <div className="main-body itens-list">
               <div>
               <h3 className="orders">PEDIDOS</h3>
               </div>
             
             {orders.map((orders, index) => {
             return (<div key={index}>
              <hr className="divide-line"></hr>
              <div className="orders">
              <p>Cliente: {orders.customerName}</p>
              <p>Garçom: {orders.waiter}</p>
             {
                orders.orderedItens.map((order, index) => {
                  return (
                    <tbody key={'tr' + index}>
                      <tr>
                        <td>{order.quantity} </td>
                        <td>{order.name}</td>
                      </tr>
                    </tbody>
                         )
                      })
              }
                <p>Preço Total: {orders.totalPrice}</p> 
              </div> 
           
                <Button text="Marcar como Pronto"/>
             </div>)
            })}
             </div>
          </div>
      );
  }
}


export default Kitchen