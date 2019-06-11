import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import menu from '../data';
import Logo from "../components/Logo";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      order: [],
      totalPrice: ""
    };
  }

  orderClick = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.name === item.name;
    });
    const totalPrice = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
     }, 0);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };
      this.setState({
        order: this.state.order.concat(newItem),
        totalPrice: totalPrice
      });
    } else {
      let newOrder = this.state.order;
      newOrder[itemIndex].quantity += 1;
      this.setState({
        order: newOrder,
        totalPrice: totalPrice
      });
    }
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  clickDelete = (item) => {
    const itemIndex = this.state.order.findIndex((product) => {
      return product.name === item.name;
    });
     
    let newOrder = this.state.order;
      newOrder[itemIndex].quantity -= 1;

     const quantity = newOrder[itemIndex].quantity;
      
     if(quantity > 0) {
      this.setState({
        order: newOrder
      });

      } else {
        newOrder.splice(itemIndex, 1)
        this.setState({
          order: newOrder
        });
      } 
  }

  sendOrder = () => {
    const user = firebase.auth().currentUser;
    database.collection("orders").doc().set({
      waiter: `${user.displayName}`,
      customerName: this.state.customerName,
      orderedItens: this.state.order,
      totalPrice: this.state.totalPrice

    });
  }

  render() {
    const user = firebase.auth().currentUser;
    const totalPrice = this.state.order.reduce((acc, cur) => {
     return acc + (cur.quantity * cur.price)
    }, 0);
   
    return (
      <div>
        
        <Logo />
        <div className="forms">
         <p>Garçom:{user.displayName}</p>
         <Input 
              type="text" 
              value={this.state.customerName} 
              placeholder="Digite o nome do cliente"
              onChange={(e) => this.handleChange(e, "customerName")} 
          />
            <hr></hr>
              <h1 className="titles">Café da Manhã</h1>
              <ul className="titles">{
                 menu.breakfast.map((product, i) => {
                  return <li key={i} 
                    onClick={() => this.orderClick(product)}>
                    {product.name}</li>
                })
              }</ul>
              <h1 className="titles">Menu Principal</h1>
              <ul className="titles">{
                 menu.mainMenu.map((product, i) => {
                  return <li key={i} 
                    onClick={() => this.orderClick(product)}>
                    {product.name}</li>
                })
              }
              </ul >
              <h1>Itens comprados</h1>
            {
              this.state.order.map((product, i) =>{
                return <div key={i}> <p>{product.name} - {product.price * product.quantity} - {product.quantity}</p>
              <button onClick={()=> this.clickDelete(product)}>Deletar</button>
              </div>})
            }
            <hr></hr>
            <h1>Total</h1>
              <p>Valor Total: {totalPrice}</p>
              <button onClick={this.sendOrder}>Finalizar pedido</button>
              </div>
      </div>       
    );
  }
  }

export default withFirebaseAuth({firebaseAppAuth}) (Saloon);