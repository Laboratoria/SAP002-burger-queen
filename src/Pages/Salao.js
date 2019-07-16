import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from '../firebaseConfig';
import Input from '../components/Input';
import './Salao.css';
import '../components/Button.css';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


const menu = {
  "breakfast": [
    { img: "/images/cafe_americano.jpg", item: "Café Americano", preco: 5 },
    { img: "/images/cafe_com_leite.jpg", item: "Café com Leite", preco: 7 },
    { img: "/images/sand_presunto_queijo.jpg", item: "Sanduíche de Presunto e Queijo", preco: 10 },
    { img: "/images/suco.jpg", item: "Suco de Fruta Natural", preco: 7 }
  ],
  "lunch": [
    { img: "/images/hamburger_bovino.jpg", item: "Hamburguer Simples Bovino", preco: 10 },
    { img: "/images/hamburger_frango.jpg", item: "Hamburguer Simples de Frango", preco: 10 },
    { img: "/images/hamburger_vegetariano.jpg", item: "Hamburguer Simples Vegetariano", preco: 10 },
    { img: "/images/hamburger_bovino.jpg", item: "Hamburguer Duplo Bovino", preco: 15 },
    { img: "/images/hamburger_frango.jpg", item: "Hamburguer Duplo Frango", preco: 15 },
    { img: "/images/hamburger_vegetariano.jpg", item: "Hamburguer Duplo Vegetariano", preco: 15 },
  ],
  "acompanhamentos": [
    { img: "/images/batata_frita.jpg", item: "Batata Frita", preco: 5 },
    { img: "/images/cebola.jpg", item: "Anéis de Cebola", preco: 5 }
  ],
  "bebidas": [
    { item: "Água 500ml", preco: 5 },
    { item: "Água 750ml", preco: 7 },
    { item: "Bebida gaseificada 500ml", preco: 7 },
    { item: "Bebida gaseificada 750ml", preco: 10 }
  ],
  "adicional": [
    { img: "/images/queijo.jpg", item: "Queijo", preco: 1 },
    { img: "/images/ovo.jpg", item: "Ovo", preco: 1 }
  ]
}

class Salao extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cliente: "",
      funcionario: "",
      comprar: [],
    }
  }

  cliqueDaCompra = (opcao) => {
    const itemIndex = this.state.comprar.findIndex((produto) => {
      return produto.item === opcao.item;
    })
    if (itemIndex < 0) {
      const newItem = {
        ...opcao,
        quantidade: 1
      };
      this.setState({
        comprar: this.state.comprar.concat(newItem)
      });
    } else {
      let newComprar = this.state.comprar;
      newComprar[itemIndex].quantidade += 1;
      this.setState({
        comprar: newComprar
      })
    }
  }

  cliqueDeleta = (opcao) => {
    const itemIndex = this.state.comprar.findIndex((produto) => {
      return produto.item === opcao.item;
    });
    let newComprar = this.state.comprar;
    newComprar[itemIndex].quantidade -= 1;

    const quantidade = newComprar[itemIndex].quantidade;

    if (quantidade > 0) {
      this.setState({
        comprar: newComprar

      });
    } else {
      newComprar.splice(itemIndex, 1);
      this.setState({
        comprar: newComprar
      });
    }
  }

  sendOrder = () => {
    function pattern(dig) {
      return (dig < 10) ? '0' + dig : dig;
    }
    const now = new Date
    const obj = {
      cliente: this.state.cliente,
      funcionario: this.state.funcionario,
      comprar: this.state.comprar,
      hour: pattern(now.getHours()) + ":" + pattern(now.getMinutes()) + ":" + pattern(now.getSeconds())
    }
    this.props.history.push(`/Kitchen`);
    database.collection('orders').add(obj)
      .then(() => { this.setState({ comprar: [] }) })
    this.setState({
      comprar: this.state.comprar
    })
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  logout = () => {
    firebaseAppAuth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
        this.props.history.push(`/`);
      });
  }

  render() {
    let valorTotal = this.state.comprar.reduce((acc, cur) => {
      return acc + (cur.quantidade * cur.preco)
    }, 0);
    console.log(this.props)
    return (
      <div className="container">
        <div className="menu">
          <h1 className="menuTitle">Menu</h1>
          <h2>Café da Manhã</h2>
          {
            menu.breakfast.map((produto, i) => {
              return <div className="bordaInteira" key={i}>
                <img src={produto.img} width="200" />
                <div className="borda">{produto.item} - Valor: R${produto.preco}</div>
                <button className="addOrderButton" key={i} onClick={() =>
                  this.cliqueDaCompra(produto) || alert("ITEM ADICIONADO COM SUCESSO")}>ADD</button>
              </div>
            })
          }
          <h2>Almoço - Jantar</h2>
          {
            menu.lunch.map((produto, i) => {
              return <div className="bordaInteira" key={i}>
                <img src={produto.img} width="200" />
                <div className="borda">{produto.item} - Valor: R${produto.preco}</div>
                <button className="addOrderButton" key={i} onClick={() =>
                  this.cliqueDaCompra(produto) || alert("ITEM ADICIONADO COM SUCESSO")}>ADD</button>
              </div>
            })
          }
          <h2>Acompanhamentos</h2>
          {
            menu.acompanhamentos.map((produto, i) => {
              return <div className="bordaInteira" key={i}>
                <img src={produto.img} width="200" />
                <div className="borda">{produto.item} - Valor: R${produto.preco}</div>
                <button className="addOrderButton" key={i} onClick={() =>
                  this.cliqueDaCompra(produto) || alert("ITEM ADICIONADO COM SUCESSO")}>ADD</button>
              </div>
            })
          }
          <h2>Bebidas</h2>
          <img className="bebida" src="../images/bebidas.jpg" width="200" />
          {
            menu.bebidas.map((produto, i) => {
              return <div className="bordaInteira" key={i}>
                <img src={produto.img} width="200" />
                <div className="borda">{produto.item} - Valor: R${produto.preco}</div>
                <button className="addOrderButton" key={i} onClick={() =>
                  this.cliqueDaCompra(produto) || alert("ITEM ADICIONADO COM SUCESSO")}>ADD</button>
              </div>
            })
          }
          <h3 className="adicionais">Adicionais</h3>
          {
            menu.adicional.map((produto, i) => {
              return <div className="bordaInteira" key={i}>
                <img src={produto.img} width="200" />
                <div className="borda">{produto.item} - Valor: R${produto.preco}</div>
                <button className="addOrderButton" key={i} onClick={() =>
                  this.cliqueDaCompra(produto) || alert("ITEM ADICIONADO COM SUCESSO")}>ADD</button>
              </div>
            })
          }
        </div>
        <h1> Pedido </h1>
        {
          this.state.comprar.map((produto, i) => {
            return <div key={i}>
              <p key={i}>{produto.item}  R${produto.preco * produto.quantidade}  Qtd: {produto.quantidade} </p>
              <button onClick={() => this.cliqueDeleta(produto) || alert("1 ITEM DELETADO")}>Excluir</button>
            </div>
          })
        }
        <Input value={this.state.cliente}
          text="Digite o nome do cliente"
          onChange={(e) => this.handleChange(e, "cliente")} />
        <Input value={this.state.funcionario}
          text="Digite seu nome"
          onChange={(e) => this.handleChange(e, "funcionario")} />
        <button className="orderButton" onClick={this.sendOrder}>Enviar pedido</button>
        <hr></hr>
        <h1> Total </h1>
        <h3> Valor Total: R${valorTotal}</h3>
        <button className="logoutButton" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Salao);