import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import GetOrder from '../components/GetOrder.js';

class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            GetOrder,
            clientName: '',
            total: 0
        }
    }
    
    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }
    
    render () {

        // const orderTotalPrice = this.state.GetOrder.reduce((acc, cur) => {
        //     return acc + (cur.quantity * cur.price)
        // }, 0);
        
        return (
            <>
            <div>
            <h2>Pedido</h2>
            <ul>
            {
                GetOrder.map((product, i) => {
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
            {/* <h3>Valor total: R$ {orderTotalPrice},00</h3> */}
            
            </div>
            
            
            <Input type="text" placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "clientName")} value={this.props.clientName}/>            
            <Button text="Enviar para a cozinha"/>
            </>
            )
        }
    }
    
    export default Order;
    