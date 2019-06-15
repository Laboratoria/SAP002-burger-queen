import React from 'react';
import Button from "./Button"
import Input from "./Input"
import "./LoginBox.css"

function LoginBox (props){
      return (
        <div className="inner-container">
          <div className="header">
          </div>
          <div className="box">

            <div className="input-group">
              <label htmlFor="email">E-mail:</label>
              <Input
                type="text"
                value={props.valueEmail}
                onChange={props.onChangeEmail}
                className="login-input"
                placeholder="E-mail"/>
            </div>
            <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <Input
              type="password"
              value={props.valuePassword}
              onChange={props.onChangePassword}
              className="login-input"
              placeholder="Senha"/>
          </div>
          </div>
          <Button className="btn-login" text={props.textBtn} onClick={props.onClick} />
      </div>
    );
    
  }

  export default LoginBox ;