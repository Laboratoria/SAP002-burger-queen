import React from 'react';
import './Header.css';
import logoFull from '../assets/logofull.png';
import user from '../assets/user.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Header">
        <figure className="Header-logo">
          <img src={logoFull} alt="logo" className="Header-logo-img"></img>
        </figure>
        <div className="Header-server">
          <figure className="Header-server-img-container">
            <img src={user} alt="user" className="Header-server-img">
            </img>
          </figure>
          <h3 classMenu-item Name="Header-server-text" >{this.props.server}</h3>
          <button onClick={this.props.logout} className="Header-server-logout">
            LOGOUT
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
