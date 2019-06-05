import React from 'react';
import firebase from '../firebase/firebase-config';
import Data from '../data.json';
import './saloon.css';
import '../components/Button.css';
import Button from '../components/Button';
import { faCoffee, faGlassWhiskey, faHamburger, faCertificate, faPlusCircle, faMinusCircle, faShareSquare} from '@fortawesome/free-solid-svg-icons';

const database = firebase.firestore();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      pedido: []
    }
  }

  componentDidMount() {
    database.collection('Pedidos').get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      clientName: this.state.clientName,
      pedido: []
    }
    database.collection('Pedidos').add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  handleAdd = (item) => {
    const itemIndex = this.state.pedido.findIndex(
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
        pedido: this.state.pedido.concat(newItem)
      });
    } else {
      let newPedido = this.state.pedido;
      newPedido[itemIndex].quantity += 1;
      this.setState({
        pedido: newPedido
      });
    }
  }

  handleDelete = (item) => {
    const itemIndex = this.state.pedido.findIndex((produto) => {
      return (produto.title === item.title);
    })

    let newPedido = this.state.pedido;
    newPedido[itemIndex].quantity -= 1;

    const quantity = newPedido[itemIndex].quantity;

    if (quantity > 0) {
      this.setState({
        pedido: newPedido
      });
    } else {
      newPedido.splice(itemIndex, 1);
      this.setState({
        pedido: newPedido
      });
    }
  };

  render() {
    const total = this.state.pedido.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <section className='pedido'>
        <p>Olá, você está no Salão</p>
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
          <div className='pedido-items'>
            <h1>Pedido</h1>
            <h2>Produtos Comprados</h2>
            {
              this.state.pedido.map((item, i) => {
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
              placeholder="Nome da(o) cliente"
              onChange={(e) => this.handleChange(e, "clientName")} />
            <Button text="Enviar pedido para cozinha" className='btn item-btn' iconName={faShareSquare} onClick={this.handleClick} />
            {
              this.state.listItem.map((item, index) => {
                return (
                  <p key={index}>{item.clientName}</p>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  }

}

export default Saloon
