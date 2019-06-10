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

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comprar: []
        };   
    }

    clique = (item) => {
       const itemIndex = this.state.comprar.findIndex(
           (produto)=>{
            return produto.nome === item.nome;
            });

        if(itemIndex < 0 ){
            const newItem = {
                ...item,
                quantidade: 1
            }
            this.setState({
            comprar: this.state.comprar.concat(newItem)
            });
        } else {
            let newComprar = this.state.comprar;
            newComprar[itemIndex].quantidade += 1
            this.setState({
                comprar : newComprar
            });
        }

    }

    render() {
        console.log(this.state.comprar);
        return(
            <div>
                {
                    cafeDaManha.map((produto, i) => {
                        return <button key={i} onClick={() => { this.clique(produto)}
                            }>{produto.nome}</button>
                    })
                }
                {
                    this.state.comprar.map((produto, i) => {
                        return <p key={i}>{produto.nome} - {produto.preco * produto.quantidade} - {produto.quantidade}</p>
                    })
                }
            </div>
        )
    }
}

export default Home;