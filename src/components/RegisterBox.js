import React from 'react';
import Button from './Button'
import Input from './Input'
import './RegistreBox.css'


function RegisterBox (props) {
  return (
  <div>
    <div className="inner-container">
    <div className="header">
    </div>
      <div className="box">
        <div className="input-group">
          <label htmlFor="username">Nome:</label>
          <Input
            type="text"
            value={props.valueName}
            onChange={props.onChangeName}
            className="login-input"
            placeholder="nome"/>
        </div>
  
        <div className="input-group">
           <label htmlFor="email">E-mail:</label>
            <Input
            type="text" 
            value={props.valueEmail}
            onChange={props.onChangeEmail}
            className="login-input" 
            placeholder="e-mail"/>
        </div>
  
        <div className="input-group">
            <label htmlFor="password">Senha:</label>
             <input
             type="password"
             value={props.valuePassword}
             onChange={props.onChangePassword}
             className="login-input"
             placeholder="senha"/>
        </div>
            <select classname="setor" onChange={props.onChangeSetor}> 
              <option  value="hall">Hall</option>
              <option  value="kitchen">Kitchen</option>
            </select>
        </div>
        <Button className="btn-login" text={props.textBtn} onClick={props.onClick} />  
      </div>
    </div>
      );
    }
  
  



export default RegisterBox;