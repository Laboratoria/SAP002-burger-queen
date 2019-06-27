import React from 'react';

function ButtonAdd(props) {
    return (
        <button className="Button-add" onClick={props.onClick}>{props.text}</button>
        );
    }
    
    export default ButtonAdd;