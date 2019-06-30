import React from 'react';
import allDay from '../components/allday.json';
import '../components/Components.css'
import Input from '../components/Input';
import Button from '../components/Button';


class Allday extends React.Component{
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
        this.setState({
            order: this.state.order.concat(product)
        });
    }

    render() {
        return (
            <>
                <Input type="text" placeholder="Nome do cliente" onChange={(e) => this.handleChange(e, "clientName")} value={this.props.clientName}/>
                <ul>
                    {
                    allDay.hamburger.map((product, i) => {
                        return  <li className="Item" key={i}>
                            <h3>{product.type}</h3>
                            <h3>R$ {product.price},00</h3>
                            {/* select de quantidade */}
                            {/* tipo */}
                            <Button text="Add item" onClick={() => this.getProduct(product)}/>
                        </li>
                    })
                    }

                    {
                        allDay.hamburgerType.map((product, i) => {
                            return  <li className="Item" key={i}>
                                <h3>{product.type}</h3>
                                {/* select de qual */}
                                <Button text="Add item" onClick={() => this.getProduct(product)}/>
                            </li>
                        })
                        }

                        {
                        allDay.extra.map((product, i) => {
                            return  <li className="Item" key={i}>
                                <h3>{product.type}</h3>
                                <h3>R$ {product.price},00</h3>
                                {/* select de quantidade */}
                                <Button text="Add item" onClick={() => this.getProduct(product)}/>
                            </li>
                        })
                        }

                        {
                        allDay.drinks.map((product, i) => {
                            return  <li className="Item" key={i}>
                                <h3>{product.type}</h3>
                                <h3>R$ {product.price},00</h3>
                                {/* select de quantidade */}
                                <Button text="Add item" onClick={() => this.getProduct(product)}/>
                            </li>
                        })
                        }
                    </ul>
                </>
            )
        }
}

export default Allday;

