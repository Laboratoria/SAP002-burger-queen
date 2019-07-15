import React from 'react';

class GetOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            // clientName: '',
            // total: 0
        }
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
    
    render (){
        return
                
    }
}

export default GetOrder;
