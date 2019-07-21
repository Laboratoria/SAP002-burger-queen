import React from 'react';
import allDay from '../components/allday.json';
import '../components/Components.css'
// import Input from '../components/Input';
import Button from '../components/Button';
import { getProduct } from '../components/GetOrder';


class Allday extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // clientName: '',
            order: []
            // total: 0
        }
    }
    
    getProductClick = (e) => {
        console.log(e.target)
        getProduct();
    }
    
    // handleChange = (event, element) => {
    //     const newState = this.state;
    //     newState[element] = event.target.value;
    //     this.setState(newState);
    // }
    
    // getProduct = (product) => {
    //     const productIndex = this.state.order.findIndex((item) => {
    //         return item.item === product.item;
    //     });
    
    //     if (productIndex < 0) {
    //         const newProduct = {
    //             ...product,
    //             quantity: 1
    //         };
    //         this.setState({
    //             order: this.state.order.concat(newProduct)
    //         });
    //     } else {
    //         let newOrder = this.state.order;
    //         newOrder[productIndex].quantity += 1;
    //         this.setState({
    //             order: newOrder
    //         })
    //     };
    
    //     console.log("oi");
    
    // }
    
    
    render() {
        
        // const orderTotalPrice = this.state.order.reduce((acc, cur) => {
        //     return acc + (cur.quantity * cur.price)
        // }, 0);
        
        // const getProductClick = getProduct;
        // console.log(this.getProduct)
        // console.log(this.state.product)
        
        return (
            <section className="Align-menu">
            
            <h1 className="Menu-title">ALMOÇO E JANTAR</h1>
            
            {/* <Input type="text" placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "clientName")} value={this.props.clientName}/> */}
            <ul className="Item-list">
            {
                allDay.hamburger.map((product, i) => {
                    return  <li className="Item" key={i}>
                    <section className="Align-product-price">
                    <h3>{product.item}</h3>
                    <h3>R$ {product.price},00</h3>
                    {/* select de quantidade */}
                    {/* tipo */}
                    </section>
                    <Button className="Button-add" text="Adicionar" onClick={this.getProductClick}/>
                    </li>
                })
            }
            
            <h2>Tipo de Hamburguer</h2>
            <ul className="Burger-type-list">
            {
                allDay.hamburgerType.map((product, i) => {
                    return  <li className="Item-burger-type" key={i}>
                    <h3>{product.item}</h3>
                    {/* select de qual */}
                    <Button className="Button-add" text="Adicionar" onClick={this.getProductClick}/>
                    </li>
                })
            }
            </ul>
            
            <h2>Extras</h2>       
            <ul className="Extras-burger">
            {
                allDay.extra.map((product, i) => {
                    return  <li className="Item-extras" key={i}>
                    <section className="Align-product-price">
                    <h3>{product.item}</h3>
                    <h3>R$ {product.price},00</h3>
                    {/* select de quantidade */}
                    </section>
                    <Button className="Button-add" text="Adicionar" onClick={this.getProductClick}/>
                    </li>
                })
            }
            </ul>
            
            <h2>Bebidas</h2>                        
            {
                allDay.drinks.map((product, i) => {
                    return  <li className="Item" key={i}>
                    <section className="Align-product-price">
                    <h3>{product.item}</h3>
                    <h3>R$ {product.price},00</h3>
                    {/* select de quantidade */}
                    </section>
                    <Button className="Button-add" text="Adicionar" onClick={this.getProductClick}/>
                    </li>
                })
            }
            </ul>
            
            {/* <div>
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
                
            <Button text="Enviar para a cozinha"/> */}
            </section>
            )
        }
    }
    
    export default Allday;
    
    