import React from 'react';
import Button from '@material-ui/core/Button';

const menu = {
  "breakfast": [
    { item: "Café Americano", preco: 5 },
    { item: "Café com Leite", preco: 7 },
    { item: "Sanduíche de Presunto e Queijo", preco: 10 },
    { item: "Suco de Fruta Natural", preco: 7 }
  ],
  "lunch": [
    { item: "Hamburguer Simples Bovino", preco: 10 },
    { item: "Hamburguer Simples de Frango", preco: 10 },
    { item: "Hamburguer Simples Vegetariano", preco: 10 },
    { item: "Hamburguer Duplo Bovino", preco: 15 },
    { item: "Hamburguer Duplo Frango", preco: 15 },
    { item: "Hamburguer Duplo Vegetariano", preco: 15 },
    { item: "Queijo", preco: 1 },
    { item: "Ovo", preco: 1 },
    { item: "Batata Frita", preco: 5 },
    { item: "Anéis de Cebola", preco: 5 },
    { item: "Água 500ml", preco: 5 },
    { item: "Água 750ml", preco: 7 },
    { item: "Bebida gaseificada 500ml", preco: 7 },
    { item: "Bebida gaseificada 750ml", preco: 10 }
  ]
}



class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comprar: []
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

  render() {
    const valorTotal = this.state.comprar.reduce((acc, cur) => {
      return acc + (cur.quantidade * cur.preco)
    }, 0);
    console.log(this.props)
    return (
      <div className="menu">
        <h1>Menu</h1>
        <h2>Café da Manhã</h2>
        {
          menu.breakfast.map((produto, i) => {
            return <div key={i}>
              <div>{produto.item} - Valor: R${produto.preco}
                <button className="orderButton" key={i} onClick={() => this.cliqueDaCompra(produto)}>ADD</button>
              </div>
            </div>
          })
        }
        <h2>Almoço - Jantar</h2>
        {
          menu.lunch.map((produto, i) => {
            return <div key={i}>
              <div> {produto.item} - Valor: R${produto.preco} 
                <button className="orderButton" key={i} onClick={() => this.cliqueDaCompra(produto)}>ADD</button>
              </div>
            </div>
          })
        }

        <hr></hr>
        <h1> Itens Comprados </h1>
        {
          this.state.comprar.map((produto, i) => {
            return <div key={i}>
              <p key={i}>{produto.item} / {produto.preco * produto.quantidade} /
              {produto.quantidade} </p>
              <button onClick={() => this.cliqueDeleta(produto)}>Excluir</button>
            </div>
          })
        }
        <hr></hr>
        <h1> Total </h1>
        <p> Valor Total: R${valorTotal}</p>
      </div>
    );
  }
}

export default Salao;