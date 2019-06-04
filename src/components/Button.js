import React from 'react';
import './Button.css';

function Button(props) {
  return (
    < div className="itens" >
      <button className="button" onClick={props.onClick}>
        {props.text}
      </button>
    </div >
  )
}

export default Button