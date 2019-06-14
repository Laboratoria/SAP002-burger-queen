import React from 'react';
import Button from '../Button';
import './Salao.css'
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link }
  from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


const product = [
  {
    name: "Café",
    price: "5.00"
  },
  {
    name: "Café c/ Leite",
    price: "7.00"
  },
  {
    name: "Sanduíche Presunto/Queijo",
    price: "10.00"
  },
  {
    name: "Suco Fruta",
    price: "7.00"
  }
];

const product24 = [
  {
    name: "Hamburguer Bovino",
    price: "10.00"
  },
  {
    name: "Hamburguer Duplo Bovino",
    price: "15.00"
  },
  {
    name: "Hamburguer Frango",
    price: "10.00"
  },
  {
    name: "Hamburguer Duplo Frango",
    price: "15.00"
  },
  {
    name: "Hamburguer Vegetariano",
    price: "10.00"
  },
  {
    name: "Hamburguer Duplo Vegetariano",
    price: "15.00"
  },
  {
    name: "Batata Frita",
    price: "5.00"
  },
  {
    name: "Anéis Cebola",
    price: "5.00"
  },
  {
    name: "Água 500ml",
    price: "5.00"
  },
  {
    name: "Água 750ml",
    price: "7.00"
  },
  {
    name: "Refrigerante 500ml",
    price: "7.00"
  },
  {
    name: "Refrigerante 750ml",
    price: "10.00"
  },
  {
    name: "Adic. Queijo",
    price: "1.00"
  },
  {
    name: "Adic. Ovo",
    price: "1.00"
  },
];

// const productAdd = [
//   {
//     name: "Queijo",
//     price: "1.00"
//   },
//   {
//     name: "Ovo",
//     price: "1.00"
//   },
// ];

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      employee: "",
      listItem: []
    };
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        database.collection("users").doc(user.uid).get()
          .then(doc => {
            const name = doc.data().name;
            this.setState({ employee: name })
          })
      }
    })
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  handleClick = () => {
    const object = {
      client: this.state.client,
      employee: this.state.employee,
      listItem: this.state.listItem,
    }
    database.collection('Pedidos').add(object)
    this.setState({
      listItem: this.state.listItem
    })
    alert("Pedido enviado com sucesso!");
    window.location.href = 'salao'
  }

  clickBuy = (item) => {
    const itemIndex = this.state.listItem.findIndex((product) => {
      return product.name === item.name;
    });

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1
      };
      this.setState({
        listItem: this.state.listItem.concat(newItem)
      });
    } else {
      let newBuy = this.state.listItem;
      newBuy[itemIndex].quantity += 1;
      this.setState({
        listItem: newBuy
      });
    }
  }

  clickDel = (option) => {
    const itemIndex = this.state.listItem.findIndex((product) => {
      return product.name === option.name;
    });
    let newlistItem = this.state.listItem;
    newlistItem[itemIndex].quantity -= 1;

    const quantity = newlistItem[itemIndex].quantity;
    if (quantity > 0) {
      this.setState({
        listItem: newlistItem
      });
    } else {
      newlistItem.splice(itemIndex, 1);
      this.setState({
        listItem: newlistItem
      });
    }
  }

  render() {

    const totaltoPay = this.state.listItem.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);
    return (
      <div>
        <div className="top">
          <h3>Cliente</h3>
          <input value={this.state.client}
            placeholder="Nome do Cliente"
            onChange={(e) => this.handleChange(e, "client")} />
          <h3>Garçom/Garçonete</h3>
          <input value={this.state.employee}
            placeholder="Nome do Funcionário"
            onChange={(e) => this.handleChange(e, "employee")} />
          <Button text="Enviar para Cozinha" onClick={this.handleClick}></Button>
          <Link to="/">Sair</Link>
        </div>
        <hr />
        <div className="column1">
          <h1>Café da Manhã</h1>
          {
            product.map((product, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(product)}>{product.name}</button>
            })
          }
          <h1>Almoço e Jantar</h1>
          {
            product24.map((product24, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(product24)}>{product24.name}</button>
            })
          }
          {/* <h1>Adicionais</h1>
          {
            productAdd.map((productAdd, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(productAdd)}>{productAdd.name}</button>
            })
          } */}
        </div>
        <div className="column2">
          <h3><b>Lista de Pedido</b></h3>
          {
            this.state.listItem.map((product, index) => {
              return <div className="lista" key={index}>
                <p>{product.name} R$
            {product.price * product.quantity} Quant.
            {product.quantity}
                  <Button type='red' text="x" onClick={() => this.clickDel(product)} /></p>
              </div>
            })
          }
          <h2><b>Total: {totaltoPay},00</b></h2>
        </div>
      </div >
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Salao);