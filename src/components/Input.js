import React from 'react';
import "./Input.css"

function Input(props) {
  return (
    <div className="itens">
      <input className="input" type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
    </div>
  );
}

export default Input;