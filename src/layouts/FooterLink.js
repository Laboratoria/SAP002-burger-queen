import React from 'react';
import { CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'

function FooterLink(props) {
  return (
    <div>
      <CardTitle className='d-flex justify-content-center'>{props.msg}
        <Link to={props.link}>{props.text}</Link>
      </CardTitle>
    </div>
  );
}

export default FooterLink;
