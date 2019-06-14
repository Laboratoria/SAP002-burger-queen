import React from 'react';
import '../App.css'

function Button(props) {
  return (
    <button className="submit-button input-box" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;