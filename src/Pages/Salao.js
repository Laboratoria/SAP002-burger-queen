import React from 'react';
import Button from '../Button';
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
    iten: "Sanduíche de Presunto e Queijo",
    price: "10.00"
  },
  {
    iten: "Suco de Fruta Natural",
    price: "7.00"
  }
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
  //   database.collection('Pedidos').get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       this.setState({ listItem: data });
  //     });
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
      listItem: this.state.listItem.concat(object)
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

  // cliqueDeleta = (opcao) => {
  //   const itemIndex = this.state.listItem.findIndex((product) => {
  //     return product.item === opcao.item;
  //   });
  //   let newlistItem = this.state.listItem;
  //   newlistItem[itemIndex].quantidade -= 1;

  //   const quantidade = newlistItem[itemIndex].quantidade;

  //   if (quantidade > 0) {
  //     this.setState({
  //       listItem: newlistItem
  //     });
  //   } else {
  //     newlistItem.splice(itemIndex, 1);
  //     this.setState({
  //       listItem: newlistItem
  //     });
  //   }
  // }


  render() {

    const totaltoPay = this.state.listItem.reduce((acc, cur) => {
      return acc + (cur.quantity * cur.price)
    }, 0);

    return (
      <React.Fragment>

        <input value={this.state.client}
          placeholder="Nome do Cliente"
          onChange={(e) => this.handleChange(e, "client")} />
        <input value={this.state.employee}
          placeholder="Nome do Funcionário"
          onChange={(e) => this.handleChange(e, "employee")} />

        {/* {
          this.state.listItem.map((item, index) => {
            return <p key={index}>{item.client} | {item.employee} </p>
          })
        } */}

        {
          product.map((product, index) => {
            return <button key={index}
              onClick={() => this.clickBuy(product)}>{product.iten}</button>
          })
        }

        {
          this.state.listItem.map((product, index) => {
            return <p key={index}>{product.iten} -
            {product.price * product.quantity} -
            {product.quantity}</p>
            
          })
          
        }
        <p>Valor Total: {totaltoPay}</p>
      
        <Button text="Enviar para Cozinha" onClick={this.handleClick}></Button>
        {/*<Button onClick={() => this.cliqueDeleta(product)}>Excluir</Button>*/}





      </React.Fragment >
    );
  }
}



export default withFirebaseAuth({
  firebaseAppAuth,
})(Salao);