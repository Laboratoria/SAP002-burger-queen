import React from 'react';

import './Button.css'

function Button(props) {
    return (
      <button className= "button"onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
  
  
  export default Button;