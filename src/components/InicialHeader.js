import React from 'react';
import logo from '../images/logo.png';

function InitialHeader() {
    return (
        <header className="Align">
            <h2 className="Text-initial-header">SISTEMA INTERNO DE PEDIDOS</h2>
            <img className="Logo-initial-header" src={logo} alt="BURGER QUEEN"/>
        </header>
    );
    
}
    
export default InitialHeader;