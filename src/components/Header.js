import React from 'react';
import logo from '../assets/logo.png'
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="Header">
        <div className="row">
          <div className="Header-logo-container col-4 px-5">
            <figure className="Header-logo">
              <img src={logo} alt="" className="Header-logo-img"></img>
            </figure>
            <h1 className="Header-logo-text">Burger<br></br>Queen</h1>
          </div>
          <div className=" p-5 col-3  offset-4">
            <h3>{this.props.server.toUpperCase()}</h3>
          </div>
        </div>
        <div>
        </div>
      </header>
    );
  }
}

export default Header;