import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import App from '../App'
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import addUser from '../firebase/firestore';

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

const cardapio = [
  {
    name: "café com leite",
    price: 5
  },
  {
    name: "café americano",
    price: 7
  },
  {
    name: "sanduiche de presunto e queijo",
    price: 10
  },
  {
    name: "suco de fruta natural",
    price: 7
  },
  {
    name: "hamburguer bovino simples",
    price: 10
  },
  {
    name: "hamburguer bovino duplo",
    price: 15
  },
  {
    name: "hamburguer de frango simples",
    price: 10
  },
  {
    name: "hamburguer de frango duplo",
    price: 15
  },
  {
    name: "hamburguer vegetariano simples",
    price: 10
  },
  {
    name: "hamburguer vegetariano duplo",
    price: 15
  },
  {
    name: "adicional de queijo",
    price: 1
  },
  {
    name: "adicional de ovo",
    price: 1
  },
  {
    name: "batata frita",
    price: 5
  },
  {
    name: "anéis de cebola",
    price: 5
  },
  {
    name: "água 500ml",
    price: 5
  },
  {
    name: "água 750ml",
    price: 7
  },
  {
    name: "bebida gaseificada 500ml",
    price: 7
  },
  {
    name: "bebida gaseificada 750ml",
    price: 10
  }
]


class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      listItem: [],
      pedido: []
    };
  }

  clientOrder = (item) => {
    const itemIndex = this.state.pedido.findIndex((produto) => {
      return produto.name === item.name
    })
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantidade: 1
      }
      this.setState({
        pedido: this.state.pedido.concat(newItem)
      })
    } else {
      let newOrder = this.state.pedido
      newOrder[itemIndex].quantidade += 1
      this.setState({
        pedido: newOrder
      })
    }
  }

  clickDelete = (item) => {
    const itemIndex = this.state.pedido.findIndex((produto) => {
      return produto.name === item.name
    })
    let newOrder = this.state.pedido
    newOrder[itemIndex].quantidade -= 1
    const quant = newOrder[itemIndex].quantidade
    if (quant > 0) {
      this.setState({
        pedido: newOrder
      })
    } else {
      newOrder.splice(itemIndex, 1)
      this.setState({
        pedido: newOrder
      })
    }
  }

  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  // componentDidMount() {
  //   database.collection("pedidos").get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map(doc => doc.data())
  //       this.setState({ listItem: data })
  //     })
  // }


  //clicar valor atual altera no state e no firebase
  handleClick = (pedido) => {
    const object = {
      client: this.state.client,
      pedido
    }
    database.collection("pedidos").add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
    this.reset()
  }

  reset = () => {
    this.setState({
      pedido: [],
      client: ""
    })
  }

  render() {
    console.log(this.props.user)
    const valueTotal = this.state.pedido.reduce((acc, cur) => {
      return acc + (cur.quantidade * cur.price)
    }, 0)
    return (
      <div className="salao">
        <div className="logout">
          <div className="pedido">
            <h3>Salão</h3>
            <Link className="button-logout logout" to="/">Sair</Link>
          </div>
        </div>
        <div className="home">
          {cardapio.map((item, index) => {
            return <Button className="button-cardap" key={index} onClick={() => this.clientOrder(item)} text={item.name} />
          })
          }
        </div>
        <div className="page">
          <div className="pedido">
            <h3>Pedido</h3>
            <Input value={this.state.client} placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "client")} />
            <Button className="button" onClick={() => this.handleClick(this.state.pedido)} text="Criar Pedido" />
            {
              this.state.pedido.map((item, index) => {
                return <div key={index}>
                  <p>{item.name} - R$ {item.price * item.quantidade} - {item.quantidade} unid</p>
                  <Button className="button" text="Excluir" onClick={() => this.clickDelete(item)}></Button>
                </div>
              })
            }
            <h3>Valor Total: R$ {valueTotal}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Salao);