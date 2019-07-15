import React from 'react';
import '../App.css';
import './Kitchen.css';
import firebaseApp from "../firebaseConfig";
import Header from '../components/Header';

const database = firebaseApp.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
    this.orderReady = this.orderReady.bind(this)
  }

  componentDidMount = () => {
    database.collection('orders').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (!doc.data().done) {
          const newOrder = this.state.orders.concat({
            order: doc.data(),
            id: doc.id
          })
          this.setState({ orders: newOrder })
        }
      })
    })
  }

  orderReady = (key) => {
    const orderClicked = this.state.orders.filter(item => {
      return item.order.timeStamp === key
    })
    console.log(orderClicked)
  }

  render() {
    const orders = this.state.orders.map(elem => {
      const orderItems = elem.order.order.map(item => {
        if (!item.done) {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          )
        }
      })
      return (
        <div key={elem.order.timeStamp} className="Kitchen-order p-3 m-3">
          <h3>{elem.order.client}</h3>
          <table className="table table-text-light">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {orderItems}
            </tbody>
          </table>
          <button className="send-button"
            onClick={() => this.orderReady(elem.order.timeStamp)}>
            Pedido pronto
          </button>
        </div>
      )

    })

    return (
      <div className="App" >
        <Header />

        <div className="d-flex container flex-wrap m-0 row">
          <div>
            {orders}
          </div>
        </div >
      </div>
    );
  }
}

export default Kitchen;
