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
    iten: "Café Americano",
    price: "5.00"
  },
  {
    iten: "Café com Leite",
    price: "7.00"
  },
  {
    iten: "Sanduíche Presunto/Queijo",
    price: "10.00"
  },
  {
    iten: "Suco de Fruta Natural",
    price: "7.00"
  }
];

const product24 = [
  {
    iten: "Hamburguer Simples Bovino",
    price: "10.00"
  },
  {
    iten: "Hamburguer Simples Frango",
    price: "10.00"
  }, {
    iten: "Hamburguer Simples Vegetariano",
    price: "10.00"
  },
  {
    iten: "Hamburguer Duplo Bovino",
    price: "15.00"
  },
  {
    iten: "Hamburguer Duplo Frango",
    price: "15.00"
  },
  {
    iten: "Hamburguer Duplo Vegetariano",
    price: "15.00"
  },
  {
    iten: "Batata Frita",
    price: "5.00"
  },
  {
    iten: "Anéis de Cebola",
    price: "5.00"
  },
  {
    iten: "Água 500ml",
    price: "5.00"
  },
  {
    iten: "Água 750ml",
    price: "7.00"
  },
  {
    iten: "Refrigerante 500ml",
    price: "7.00"
  },
  {
    iten: "Refrigerante 750ml",
    price: "10.00"
  },

];

const productAdd = [
  {
    iten: "Queijo",
    price: "1.00"
  },
  {
    iten: "Ovo",
    price: "1.00"
  },
];

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: "",
      employee: "",
      listItem: []
    };
  }

  // componentDidMount() {
  //   database.collection('users').get()
  //   .then((querySnapshot) => {
  //     const data = querySnapshot.docs.map(doc => doc.data());
  //     this.setState({ listItem: data });
  //   });
  // }

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
  }

  clickBuy = (item) => {
    const itemIndex = this.state.listItem.findIndex((product) => {
      return product.iten === item.iten;
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
      return product.item === option.item;
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

        <input value={this.state.client}
          placeholder="Nome do Cliente"
          onChange={(e) => this.handleChange(e, "client")} />
        <input value={this.state.employee}
          placeholder="Nome do Funcionário"
          onChange={(e) => this.handleChange(e, "employee")} />
        <Button text="Enviar para Cozinha" onClick={this.handleClick}></Button>
        <Link to="/">Sair</Link>
        <hr />

        <div className="column1">
          <h1>Café da Manhã</h1>
          {
            product.map((product, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(product)}>{product.iten}</button>
            })
          }
          <h1>Almoço e Jantar</h1>
          {
            product24.map((product24, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(product24)}>{product24.iten}</button>
            })
          }
          <h1>Adicionais</h1>
          {
            productAdd.map((productAdd, index) => {
              return <button key={index}
                onClick={() => this.clickBuy(productAdd)}>{productAdd.iten}</button>
            })
          }
        </div>
        <div className="column2">
          <h3><b>Lista de Pedido</b></h3>
          {
            this.state.listItem.map((product, index) => {
              return <div className="lista" key={index}>
                <p>{product.iten} R$
            {product.price * product.quantity} Quant.
            {product.quantity}
                  <Button type='red' text="X" onClick={() => this.clickDel(product)} /></p>

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