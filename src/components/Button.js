import React from 'react';

function Button(props) {
    return (
        <button className={props.className} onClick={props.onClick} id={props.id}><img src={props.name}/>{props.text}</button>
        );
    }
    
    export default Button;