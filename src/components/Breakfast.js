import React from 'react';
import breakfast from '../components/breakfast.json';
import '../components/Components.css'
import Input from '../components/Input';
import Button from '../components/Button';


class Breakfast extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clientName: '',
            order: [],
            total: 0
        }
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }

    getProduct = (product) => {
        const productIndex = this.state.order.findIndex((item) => {
            return item.item === product.item;
        });

        if (productIndex < 0) {
            const newProduct = {
                ...product,
                quantity: 1
            };
            this.setState({
                order: this.state.order.concat(newProduct)
            });
        } else {
            let newOrder = this.state.order;
            newOrder[productIndex].quantity += 1;
            this.setState({
                order: newOrder
            })
        };
        
    }
    
    
    render() {
        
        const orderTotalPrice = this.state.order.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.price)
        }, 0);

        return (
            <>
            <Input type="text" placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "clientName")} value={this.props.clientName}/>
                <ul>
                    {
                    breakfast.map((product, i) => {
                        return  <li className="Item" key={i}>
                            <h3>{product.item}</h3>
                            <h3>R$ {product.price},00</h3>
                            {/* select de quantidade */}
                            <Button text="Add item" onClick={() => this.getProduct(product)}/>
                        </li>
                    })
                    }
                </ul>

                <div>
                    <h2>Pedido</h2>
                    <ul>
                        {
                            this.state.order.map((product, i) => {
                                return <li key={i}>
                                    <p>{product.item}</p>
                                    <p>R$ {product.price * product.quantity},00</p>
                                    <p>{product.quantity}</p>
                                    <Button text="Editar"/>
                                    <Button text="Excluir"/>
                                </li>
                            })
                        }
                    </ul>
                </div>

                <h1>Valor total: R$ {orderTotalPrice},00</h1>

                <Button text="Enviar para a cozinha"/>

            </>
            )
        }
}

export default Breakfast;