import React from 'react';

import './Button.css'

function Button({ type, onClick, text }) {
    return (
      <button className={`button ${type}`} onClick={onClick}>
        { text }
      </button>
    );
  }
  
  
  export default Button;