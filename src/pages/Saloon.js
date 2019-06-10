import React from 'react';
// import './App.css';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import Home from "./Home"
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import menu from '../data'

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      order: []
    };
  }

  orderClick = (item) => {
    console.log(this.state.order)
    const itemIndex = this.state.order.findIndex((produto) => {
      return produto.name === item.name;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };
      this.setState({
        order: this.state.order.concat(newItem)
      });
    } else {
      let newOrder = this.state.order;
      newOrder[itemIndex].quantity += 1;
      this.setState({
        order: newOrder
      });
    }
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  cliqueDeleta = (item) => {
    const itemIndex = this.state.order.findIndex((produto) => {
      return produto.name === item.name;
    });
     
    let newOrder = this.state.order;
      newOrder[itemIndex].quantity -= 1;

     const quantidade = newOrder[itemIndex].quantity;
      
     if(quantidade > 0) {
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

  render() {
    const { customerName } = this.state;
    const user = firebase.auth().currentUser;
    const valorTotal = this.state.order.reduce((acc, cur) => {
     return acc + (cur.quantity * cur.price)
    }, 0);
   
    return (
      <div>
         <p>Salão</p>
         <p>{user.displayName}</p>
         <Input 
              type="text" 
              value={customerName} 
              placeholder="Digite o nome do cliente"
              onChange={(e) => this.handleChange(e, "customerName")} 
            />
            {
              menu.breakfast.map((produto, i) => {
                return <button key={i} 
                  onClick={() => this.orderClick(produto)}>
                  {produto.name}</button>
              })
            }
            {
              menu.mainMenu.map((produto, i) => {
                return <button key={i} 
                  onClick={() => this.orderClick(produto)}>
                  {produto.name}</button>
              })
            }
            <hr></hr>
            <h1>Itens comprados</h1>
            {
              this.state.order.map((produto, i) =>{
                return <div key={i}> <p>{produto.name} - {produto.price * produto.quantity} - {produto.quantity}</p>
              <button onClick={()=> this.cliqueDeleta(produto)}>Deletar</button>
              </div>})
            }
            <hr></hr>
            <h1>Total</h1>
      
              <p>Valor Total: {valorTotal}</p>
            
      </div>       
    );
  }
  }

export default withFirebaseAuth({firebaseAppAuth}) (Saloon);