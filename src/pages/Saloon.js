import React from 'react';
import breakfast from '../components/breakfast.json';
import allDay from '../components/allday.json'
import ButtonAdd from '../components/ButtonAdd.js'

class Saloon extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clientName: '',
            order: [],
            total: 0
        }
    }

    getProduct = (product) => {
        this.setState({
            order: this.state.order.concat(product)
        });
    }

render() {
    console.log(this.state.order);
    return (
        <>
            <ul>
                {
                breakfast.map((product, i) => {
                    return  <li className="Item" key={i}>
                        <h3>{product.item}</h3>
                        <h3>R$ {product.price},00</h3>
                        {/* select de quantidade */}
                        <ButtonAdd text="Add item" onClick={() => this.getProduct(product)}/>
                    </li>
                })
                }
            </ul>

            <ul>
                {
                allDay.hamburger.map((product, i) => {
                    return  <li className="Item" key={i}>
                        <h3>{product.type}</h3>
                        <h3>R$ {product.price},00</h3>
                        {/* select de quantidade */}
                        {/* tipo */}
                        <ButtonAdd text="Add item" onClick={() => this.getProduct(product)}/>
                    </li>
                })
                }

{
                allDay.hamburgerType.map((product, i) => {
                    return  <li className="Item" key={i}>
                        <h3>{product.type}</h3>
                        {/* select de qual */}
                        <ButtonAdd text="Add item" onClick={() => this.getProduct(product)}/>
                    </li>
                })
                }

                {
                allDay.extra.map((product, i) => {
                    return  <li className="Item" key={i}>
                        <h3>{product.type}</h3>
                        <h3>R$ {product.price},00</h3>
                        {/* select de quantidade */}
                        <ButtonAdd text="Add item" onClick={() => this.getProduct(product)}/>
                    </li>
                })
                }

                {
                allDay.drinks.map((product, i) => {
                    return  <li className="Item" key={i}>
                        <h3>{product.type}</h3>
                        <h3>R$ {product.price},00</h3>
                        {/* select de quantidade */}
                        <ButtonAdd text="Add item" onClick={() => this.getProduct(product)}/>
                    </li>
                })
                }
            </ul>
        </>
            )
        }
}

export default Saloon;