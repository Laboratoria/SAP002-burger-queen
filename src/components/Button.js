import React from 'react';
import '../App.css'

function Button(props) {
  return (
    <button className="myButton input-box" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;