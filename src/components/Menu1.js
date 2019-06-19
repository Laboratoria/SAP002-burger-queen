import React from 'react'
import './Menu.css'


const menuMorning = [
    {
        name: "Café Americano",
        price: 5
    },
    {
        name:"Café com Leite",
        price: 7
    },
    {
        name:"Sanduíche de Presunto e Queijo",
        price: 10
    },
    {
        name:"Suco de fruta natural",
        price: 7
    }
];
 

class Menu1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buy:[]
        };
    }
    
    buyClick = (item) => {
        const itemIndex = this.state.buy.findIndex((product) => {
            return product.name === item.name;
        });
    
        if(itemIndex < 0) {
            const newIntem ={
                ...item,
                amount:1 
            };
            this.setState({
                buy: this.state.buy.concat(newIntem)
            });
        } else {
              let newBuy = this.state.buy;
              newBuy[itemIndex].amount += 1;
              this.setState({
                  buy: newBuy
                });
            }
        }
    deleteClick = (item) => {
        const itemIndex = this.state.buy.findIndex((product) => {
            return product.name === item.name;
        });
        let newBuy = this.state.buy;
        newBuy[itemIndex].amount -= 1;

        const amount = newBuy[itemIndex].quantidade;

        if (amount > 0) {
            this.setState({
                buy: newBuy
              });
            } else {
                newBuy.splice(itemIndex, 1);
                this.setState({
                    buy: newBuy
                });
            }
        }
         
     render () {
         const sum = this.state.buy.reduce((acc, cur) =>{
             return acc + (cur.amount * cur.price)
            }, 0)
         console.log(this.state.buy);
        return (
        <div className="box-menu">
        {
        menuMorning.map((product,i) => { 
          return <button
          className='btn-menu'
          key={i}
          onClick={() => this.buyClick(product)}>
          {product.name}</button>
            })
        }
        {
        this.state.buy.map((product,i) => {
          return <div key={i}>
            <p>{product.name} 
            r${product.price * product.amount} 
            qtd. {product.amount}</p>
            <button onClick={() => this.deleteClick(product)}>
            </button>
            </div>
          })
        }
        {
            <p>Valor total: r${sum}</p>
        }
        </div>
        );
      }
      
    }

export default Menu1;
