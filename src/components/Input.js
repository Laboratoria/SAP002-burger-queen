import React from 'react';

function Input(props) {
  return (
    <input className="input-box" 
      type={props.type}
      onChange={props.onChange} 
      value={props.value} 
      placeholder={props.placeholder}
    />
  );
}

export default Input;