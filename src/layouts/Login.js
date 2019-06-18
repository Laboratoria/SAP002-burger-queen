import React from 'react';
import { CardImg, CardTitle } from 'reactstrap';
import login from '../img/login.jpg';

function Login(props) {
  return (
    <div>
      <CardImg variant='top' src={login} className='img-responsive' />
      <CardTitle className='d-flex justify-content-center'>
        <h1>{props.title}</h1>
      </CardTitle>
    </div>
  );
}

export default Login;
