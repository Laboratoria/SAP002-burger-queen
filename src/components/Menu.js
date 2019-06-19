import React from 'react';

    const cafeDaManha = [
        {
            nome: "Café americano",
            preco: 5
        },
        {
            nome: "Café com leite",
            preco: 7
        },
        {
            nome: "Sanduiche de presunto e queijo",
            preco: 10
        },
        {
            nome: "Suco de fruta natural",
            preco: 7
        }
    ]

    const restoDoDia = [
        {
            nome: "Hamburguer simples",
            preco: 10
        },
        {
            nome: "Hamburguer duplo",
            preco: 15
        },
        {
            nome: "Batata frita",
            preco: 5
        },
        {
            nome: "Anéis de cebola",
            preco: 5
        },
        {
            nome: "Água 500ml",
            preco: 5
        },
        {
            nome: "Água 750ml",
            preco: 7
        },
        {
            nome: "Bebida gaseificada 500ml",
            preco: 7
        },
        {
            nome: "Bebida gaseificada 750ml",
            preco: 10
        }
    ]

class Menu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comprar: []
        };   
    }

    clique = (item) => {
       const itemIndex = this.state.comprar.findIndex(
           (produto) => {
               return produto.nome === item.nome;
            });

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantidade: 1
            }
            this.setState({
            comprar: this.state.comprar.concat(newItem)
            });

        } else {
            let newComprar = this.state.comprar;
            newComprar[itemIndex].quantidade += 1;
            this.setState({
                comprar : newComprar
            });
        }
    }

    render() {
        console.log(this.state.comprar);
        const total = this.state.comprar.reduce((acc, cur) => {
            return acc + (cur.quantidade * cur.preco)
        }, 0);
        return(
            <div>
                <div className= "cafe-da-manha">
                    <h1>Café da Manhã</h1>
                    {
                        cafeDaManha.map(( produto, i ) => {
                            return <button key={i} onClick={() => this.clique(produto)}>
                                        {produto.nome}
                                    </button>
                        })
                    }
                </div>
                <div className= "resto-do-dia">
                    <h1>Resto do dia</h1>
                    {
                        restoDoDia.map(( produto, i ) => {
                            return <button key={i} onClick={() => this.clique(produto)}>
                                        {produto.nome}
                                    </button>
                        })
                    }
                </div>
                <div className= "itens-comprados">
                    <h3>Itens Comprados</h3>
                    {
                        this.state.comprar.map(( produto, i ) => {
                            return <p key= {i}>
                                    {produto.quantidade} - {produto.nome} - R$ {produto.preco} - valor: R$ {produto.preco * produto.quantidade}
                                </p>
                        })
                    }
                </div>
                <div className= "total-final">
                    <h3>Total</h3>
                    {
                        <p>Valor total : R$ {total}</p>
                    }
                </div>
            </div>
        )
    }
}

export default Menu;