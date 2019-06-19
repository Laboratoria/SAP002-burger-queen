import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Redirect } from
  'react-router-dom'
import firebaseApp from "../firebaseConfig";
import '../components/Menu.css';
import Header from '../components/Header';
import Menu from '../components/Menu'
import menuData from '../components/menuData';

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      server: '',
      order: [],
      total: 0,
      timeStamp: '',
      done: false,
    };
    this.handleClickItem = this.handleClickItem.bind(this)

  }


  handleClickItem = (e) => {
    let oldOrder = this.state.order;
    let newItem = menuData.filter(elem => elem.id === e)[0];
    let newOrder = {
      id: newItem.id,
      name: newItem.name,
      extra: []
    }
    if (!newItem.extra.length) {


      let index = this.state.order.map(elem => elem.id === newItem.id).indexOf(true)
      if (index >= 0) {
        let newQuantity = this.state.order[index].quantity + 1
        this.state.order.splice(index, 1, newOrder)
        newOrder.quantity = newQuantity;
        let newPrice = this.state.order[index].quantity * newItem.price
        newOrder.price = newPrice;
        this.setState({
          order: [...oldOrder]
        })
      } else {
        newOrder.quantity = 1;
        newOrder.price = newItem.price;
        this.setState({
          order: [...this.state.order, newOrder]
        })
      }
    }
    else {
    }
    this.setState({
      total: this.state.order.reduce((acc, elem) => acc + elem.price, 0)
    })
  }

  render() {
    const orders = this.state.order.map(elem => {
      return (
        <div key={elem.id}>
          <p>{elem.name}  {elem.quantity}  {elem.price}</p>
          <p> {elem.extra} </p>
        </div>

      )


    })
    return (
      <div className="App">
        <Header />
        <div className="w-100 d-flex">
          <div className="col-4 order">
            {orders}
            <div>
              <p>Total     {
                this.state.total
              }</p>
            </div>
          </div >
          <Menu onClick={(e) => this.handleClickItem(e)} />
        </div>
      </div>
    );
  }
}

export default Kitchen;
