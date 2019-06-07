import React from 'react';

function Input(props) {
  return (
    <input className="input-box" onChange={props.onChange} value={props.value} />
  );
}

export default Input;