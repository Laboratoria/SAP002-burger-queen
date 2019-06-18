import React from 'react';
import './Button.css';

function Button(props) {
  return (
    < div className="itens" >
      <button className={props.className} onClick={props.onClick}>
        {props.text}
      </button>
    </div >
  )
}

export default Button