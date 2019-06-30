import React from 'react';
import '../components/Components.css'
import Button from './Button';
import Breakfast from './Breakfast';
import Allday from './Allday';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// function SaloonAside(){

class SaloonAside extends React.Component{
    constructor(props) {
        super(props);
        this.getMenu = this.getMenu.bind(this);
    }
    
    getMenu = (e) => {
        const id = e.target.id;
        
        switch(id) {
            case "breakfast":
            console.log("é café");
            // <Breakfast/>
            break;
            
            case "allday":
            console.log("é allday");
            // <Allday/>
            break;
            
            case "order":
            console.log("é pedido");
            break;
        }
    } 
    
    render (){
        return (
            
            <>
                <aside>
                    <Button className="Aside-button" text ="Café da Manhã" onClick={this.getMenu} id="breakfast"/>
                    <Button className="Aside-button" text ="Almoço e Jantar" onClick={this.getMenu} id="allday"/>
                    <Button className="Aside-button" text ="Meus pedidos" onClick={this.getMenu} id="order"/>
                </aside>
            </>
            );
            
        }
    }
    
    export default SaloonAside;