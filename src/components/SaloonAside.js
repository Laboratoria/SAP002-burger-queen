import React from 'react';
import '../components/Components.css'
import Button from './Button';
import Breakfast from './Breakfast';
import Allday from './Allday';

class SaloonAside extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            text: "Escolha uma opção ao lado",
        };
    }

    handleMenuClick = (e, el) => {
        const newState = this.state;
        const id = e.target.id;
        newState[el] = this.getMenuCondition(id);    

        this.setState(newState);
        
    }

    getMenuCondition = (id) => {
        if (id === "breakfast") {
            // console.log("é café")            
            return <Breakfast/>
        } else if (id === "allday") {
            return <Allday/>
        } else {
            console.log("é pedido")
        }
    }
    
    render (){
        return (
            
            <>
            <aside>
            <Button className="Aside-button" text ="Café da Manhã" onClick={(e) => this.handleMenuClick(e, "text")} id="breakfast"/>
            <Button className="Aside-button" text ="Almoço e Jantar" onClick={(e) => this.handleMenuClick(e, "text")} id="allday"/>
            <Button className="Aside-button" text ="Meus pedidos" onClick={(e) => this.handleMenuClick(e, "text")} id="order"/>
            </aside>
            <h4>{this.state.text}</h4>
            </>
            )
            
        }
    }
    
    export default SaloonAside;