import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';


class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            clientName: '',
            total: 0
        }
    }

    
    
    
    // concatOrderes = () => {
    //     const newArrayState = this.state;
    //     newArrayState = this.state.order.concat(this.state.order.Breakfast, this.state.order.Allday);
    //     this.setState(newArrayState);
    // }
    
    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value;
        this.setState(newState);
    }
    
    render () {
        
        // <Link to={{
        //     pathname: '/breakfast/this.props.location.state.order',
        //     state: {order: breakfastOrder}
        // }}/>
        
        // console.log(Breakfast)
        
        // console.log(<Breakfast/>)
        
        // console.log()
        
        // console.log(this.state.order.Breakfast)
        
        // console.log(this.state.order)
        
        const orderTotalPrice = this.state.order.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.price)
        }, 0);
        
        return (
            <>
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
            <h3>Valor total: R$ {orderTotalPrice},00</h3>
            
            </div>
            
            
            <Input type="text" placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "clientName")} value={this.props.clientName}/>            
            <Button text="Enviar para a cozinha"/>
            </>
            )
        }
    }
    
    export default Order;
    