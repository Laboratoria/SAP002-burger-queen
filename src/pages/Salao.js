import React from 'react';
import '../App.css';
import firebase from "../firebaseConfig";
import Input from "../components/Input";
import Button from "../components/Button";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

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
      listItem: []
    };
  }

  clientOrder = (item) => {
    const itemIndex = this.state.listItem.findIndex((produto) => {
      return produto.name === item.name
    })
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantidade: 1
      }
      this.setState({
        listItem: this.state.listItem.concat(newItem)
      })
    } else {
      let newOrder = this.state.listItem
      newOrder[itemIndex].quantidade += 1
      this.setState({
        listItem: newOrder
      })
    }
  }

  clickDelete = (item) => {
    const itemIndex = this.state.listItem.findIndex((produto) => {
      return produto.name === item.name
    })
    let newOrder = this.state.listItem
    newOrder[itemIndex].quantidade -= 1
    const quant = newOrder[itemIndex].quantidade
    if (quant > 0) {
      this.setState({
        listItem: newOrder
      })
    } else {
      newOrder.splice(itemIndex, 1)
      this.setState({
        listItem: newOrder
      })
    }
  }

  //elemento mudança newstate
  handleChange = (event, element) => {
    const newState = this.state
    newState[element] = event.target.value
    this.setState(newState)
  }

  componentDidMount() {
    database.collection("pedidos").get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data())
        this.setState({ listItem: data })
      })
  }


  //clicar valor atual altera no state e no firebase
  handleClick = () => {
    const object = {
      client: this.state.client
    }
    database.collection("pedidos").add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
    })
  }

  render() {
    const valueTotal = this.state.listItem.reduce((acc, cur) => {
      return acc + (cur.quantidade * cur.price)
    }, 0)
    return (
      <div>
        <h2>Salão</h2>
        <div className="home">
          {cardapio.map((item, index) => {
            return <Button key={index} onClick={() => this.clientOrder(item)} text={item.name} />
          })
          }
        </div>
        <div className="pedido">
          <h3>Pedido</h3>
          <Input value={this.state.client} placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "client")} />
          <Button onClick={this.handleClick} text="Criar Pedido" />
          {
            this.state.listItem.map((item, index) => {
              return <div key={index}>
                <p>{item.name} - {item.price * item.quantidade} - {item.quantidade} </p>
                <Button text="Excluir" onClick={() => this.clickDelete(item)}></Button>
              </div>
            })
          }
          {
            this.state.listItem.map((item, index) => {
              return <p key={index}>{item.client}</p>
            })
          }
          <h3>Valor Total: {valueTotal}</h3>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({ firebaseAppAuth, })(Salao);