import React from 'react';
import '../App.css';
import './Hall.css'
import firebaseApp from "../firebaseConfig";
import '../components/Menu.css';
import Header from '../components/Header';
import Menu from '../components/Menu'
import menuData from '../components/menuData';
import withFirebaseAuth from 'react-with-firebase-auth'

const firebaseAppAuth = firebaseApp.auth();
const database = firebaseApp.firestore();

class Hall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: '',
      server: '',
      order: [],
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.excludeItem = this.excludeItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.sendOrder = this.sendOrder.bind(this)
  }

  componentDidMount = () => {
    firebaseApp.auth().onAuthStateChanged(user => {
      database.collection('users').doc(user.uid).get()
        .then(querySnapshot => {
          const server = querySnapshot.data().name
          this.setState({
            server: server
          })
        })
    });
  }

  handleClickItem = (e) => {
    let newItem = menuData.filter(elem => elem.id === e)[0];
    let index = this.state.order.findIndex(
      item => item.id === newItem.id
    )
    if (index >= 0) {
      let newOrder = this.state.order
      newOrder[index].quantity += 1
      newOrder[index].price *= newOrder[index].quantity
      this.setState({
        order: newOrder
      })
    } else {
      const newOrder = {
        id: newItem.id,
        name: newItem.name,
        quantity: 1,
        price: newItem.price
      }
      this.setState({
        order: this.state.order.concat(newOrder)
      })
    }
  }

  excludeItem = (e) => {
    let index = this.state.order.findIndex(item => item.id === e)
    let newOrder = this.state.order
    newOrder[index].quantity -= 1
    newOrder[index].price *= newOrder[index].quantity
    if (!newOrder[index].quantity) {
      newOrder.splice(index)
    }
    this.setState({
      order: newOrder
    })
  }

  handleChange = (e) => {
    this.setState({ client: e.target.value })
  }

  sendOrder = () => {
    if (!this.state.client.length) {
      alert('Insira o nome do cliente')
    } else {
      if (this.state.order.length) {
        database.collection('orders').add({
          client: this.state.client,
          server: this.state.server,
          order: this.state.order,
          timeStamp: new Date(),
          done: false,
        })
        this.setState({
          order: [],
          client: '',
        })
      }
    }
  }

  logout = () => {
    this.props.history.push(`/`)
  }

  render() {
    const orders = this.state.order.map(elem => {
      return (
        <tr key={elem.id} onClick={() => this.excludeItem(elem.id)}>
          <th scope="row" >{elem.name}</th>
          <td>{elem.quantity}</td>
          <td>{'R$' + elem.price.toFixed(2)}</td>
        </tr>
      )
    })
    return (
      < div className="App" >
        <Header server={this.state.server} logout={this.logout} />
        <div className="w-100 d-flex">
          <div className="col-4 order ">
            <input type="text"
              className="Hall-input"
              placeholder="Digite o nome do cliente"
              onChange={(e) => this.handleChange(e)}
              value={this.state.client}>
            </input>
            <div>
              <table className="table table-text-light">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {orders}
                  <tr>
                    <th scope="row">Total</th>
                    <td></td>
                    <td>{
                      'R$' + this.state.order.reduce((acc, elem) => acc + elem.price, 0)
                        .toFixed(2)
                    }
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="send-button" onClick={this.sendOrder}>Enviar pedido</button>
            </div>
          </div>
          <Menu onClick={(e) => this.handleClickItem(e)} />
        </div>
      </div >
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Hall);
