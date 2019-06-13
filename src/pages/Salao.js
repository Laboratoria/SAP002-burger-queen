import React from 'react';
// import Button from '../components/Button';
// import firebase from '../firebaseConfig';
// import withFirebaseAuth from 'react-with-firebase-auth';

const breakfast = [
  {
    nome: 'Café americano',
    preco: 5
  },
  {
    nome: 'Café com leite',
    preco: 7
  },
  {
    nome: 'Sanduíche de presunto e queijo',
    preco: 10
  },
  {
    nome: 'Suco de fruta natural',
    preco: 7
  },
];

const burgers = [
  {
    nome: 'Hambúrguer simples (bovino)',
    preco: 10
  },
  {
    nome: 'Hambúrguer simples (frango)',
    preco: 10
  },
  {
    nome: 'Hambúrguer simples (vegetariano)',
    preco: 10
  },
  {
    nome: 'Hambúrguer duplo (bovino)',
    preco: 15
  },
  {
    nome: 'Hambúrguer duplo (frango)',
    preco: 15
  },
  {
    nome: 'Hambúrguer duplo (vegetariano)',
    preco: 15
  }
];

const accompaniments = [
  {
    nome: 'Batata frita',
    preco: 5
  },
  {
    nome: 'Anéis de cebola',
    preco: 5
  }
];

const drinks = [
  {
    nome: 'Água 500ml',
    preco: 5
  },
  {
    nome: 'Água 750ml',
    preco: 7
  },
  {
    nome: 'Bebida gaseificada 500ml',
    preco: 7
  },
  {
    nome: 'Bebida gaseificada 750ml',
    preco: 10
  }
];

const adds = [
  {
    nome: 'Queijo',
    preco: 1
  },
  {
    nome: 'Ovo',
    preco: 1
  }
];

class Salao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: []
    };
  };

  clickBuy = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.nome === item.nome;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantidade: 1
      };
      this.setState({
        buy: this.state.buy.concat(newItem)
      });
    } else {
      let changeQuantity = this.state.buy;
      changeQuantity[itemIndex].quantidade += 1;
      this.setState({
        buy: changeQuantity
      });
    };
  };

  clickDelete = (item) => {
    const itemIndex = this.state.buy.findIndex((product) => {
      return product.nome === item.nome;
    });
    let changeQuantity = this.state.buy;
    changeQuantity[itemIndex].quantidade -= 1;
    const quantidade = changeQuantity[itemIndex].quantidade;

    if (quantidade > 0) {
      this.setState({
        buy: changeQuantity
      });
    } else {
      changeQuantity.splice(itemIndex, 1);
      this.setState({
        buy: changeQuantity
      });
    }

  };

  render() {
    const total = this.state.buy.reduce((accumulator, current) => {
      return accumulator + current.quantidade * current.preco
    }, 0)

    return (
      <div>
        <p>Salão</p>
        {/* <h1>Burger Queen</h1>
        <h2>Cardápio</h2>
        <hr></hr>
        <h3>Café da Manhã:</h3>
        {
          breakfast.map((product, index) => {
            return <Button key={index}
              onClick={() => this.clickBuy(product)}
              text={product.nome} />
          })
        }
        <h3>Hambúrgueres:</h3>
        {
          burgers.map((product, index) => {
            return <Button key={index}
              onClick={() => this.clickBuy(product)}
              text={product.nome} />
          })
        }
        <h3>Acompanhamentos:</h3>
        {
          accompaniments.map((product, index) => {
            return <Button key={index}
              onClick={() => this.clickBuy(product)}
              text={product.nome} />
          })
        }
        <h3>Bebidas:</h3>
        {
          drinks.map((product, index) => {
            return <Button key={index}
              onClick={() => this.clickBuy(product)}
              text={product.nome} />
          })
        }
        <h3>Adicionais:</h3>
        {
          adds.map((product, index) => {
            return <Button key={index}
              onClick={() => this.clickBuy(product)}
              text={product.nome} />
          })
        }
        <hr></hr>
        <h1>Pedido:</h1>
        {
          this.state.buy.map((product, index) => {
            return <div key={index}>
              <p>
                <b>{product.nome} </b> -
                R$ {product.preco * product.quantidade} -
                Qtd:
                <Button onClick={() => this.clickDelete(product)} text="-" />
                <Button text={product.quantidade} />
                <Button onClick={() => this.clickBuy(product)} text="+" />
              </p>
            </div>
          })
        }
        <hr></hr>
        <h2>Total:</h2>
        <p>R$ {total}</p> */}
      </div>
    )
  }
}

export default Salao