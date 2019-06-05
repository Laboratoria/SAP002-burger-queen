import React from 'react';
import firebase from '../firebase/firebase-config';
import Data from '../data.json';
import './saloon.css';
import '../components/Button.css';
import Button from '../components/Button';
import { faCoffee, faGlassWhiskey, faHamburger, faCertificate, faPlusCircle, faMinusCircle, faShareSquare } from '@fortawesome/free-solid-svg-icons';

const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      order: []
    }
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = (order) => {
    const object = {
      clientName: this.state.clientName,
      order: order
    }
    database.collection('Orders').add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  handleAdd = (item) => {
    const itemIndex = this.state.order.findIndex(
      (produto) => {
        console.log(produto.title === item.title);

        return produto.title === item.title;
      });

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      }

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

  handleDelete = (item) => {
    const itemIndex = this.state.order.findIndex((produto) => {
      return (produto.title === item.title);
    })

    let newOrder = this.state.order;
    newOrder[itemIndex].quantity -= 1;

    const quantity = newOrder[itemIndex].quantity;

    if (quantity > 0) {
      this.setState({
        order: newOrder
      });
    } else {
      newOrder.splice(itemIndex, 1);
      this.setState({
        order: newOrder
      });
    }
  };

  render() {
    const total = this.state.order.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <section className='order'>
        <h1>Olá, você está no Salão</h1>
        <div className='items'>
          {
            Data.menu.breakfast.map(item => {
              return (<Button className='btn item-btn' iconName={faCoffee} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
            })
          }
          {
            Data.menu.hamburgueres.map(item => {
              return (<Button className='btn item-btn' iconName={faHamburger} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
            })
          }
          {
            Data.menu.bebidas.map(item => {
              return (<Button className='btn item-btn' iconName={faGlassWhiskey} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
            })
          }
          {
            Data.menu.acompanhamentos.map(item => {
              return (<Button className='btn item-btn' iconName={faCertificate} text={item.title} price={'- R$' + item.price} key={item.id} onClick={() => this.handleAdd(item)}></Button>)
            })
          }
        </div>
        <div className='order-list'>
          <h1>Pedido</h1>
          {
            this.state.order.map((item, i) => {
              return (
                <div key={i}>
                  <p>
                    Produto: {item.title} - Qtd: {item.quantity} - Subtotal: R$ {item.price * item.quantity}
                  </p>
                  <Button className='plus-minus-btn' iconName={faPlusCircle} onClick={() => this.handleAdd(item)}></Button>
                  <Button className='plus-minus-btn' iconName={faMinusCircle} onClick={() => this.handleDelete(item)}></Button>
                </div>
              )
            })
          }

          <h3>Valor Total do Pedido</h3>
          <p>R$ {total}</p>
          <input value={this.state.clientName}
            placeholder='Nome da(o) cliente'
            onChange={(e) => this.handleChange(e, 'clientName')} />
          <Button text='Enviar pedido para cozinha' className='btn item-btn' iconName={faShareSquare} onClick={() => this.handleClick(this.state.order)} />
        </div>
      </section>
    )
  }

}

export default Saloon
