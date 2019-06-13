import React from 'react';

function Input(props) {
  return (
    <input onChange={props.onChange} value={props.value}>
    </input>
  );
}

export default Input;