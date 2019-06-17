import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      listItem: []
      // waiter: ''
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
            {orders.map((orders, index) => {
             return (<div key={index}><p>Cliente: {orders.customerName}</p> <p>Preço Total: {orders.totalPrice}</p>
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
             </div>)
            })}
          </div>
      );
  }
  
}


export default Kitchen