import React from 'react';
import { Navbar} from 'react-bootstrap';
import logo from "../assets/img/logo-small.png"
import 'bootstrap/dist/css/bootstrap.css';


class Nav extends React.Component {

  render() {

    return (
        <div className="bg-white">
          <Navbar variant="outline-light" expand="lg" className="mb-5 border">
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" className="w-25" />
              <span className="ml-5 red-text">Olá, {}</span>
            </Navbar.Brand>
            <button onClick={this.logout} className="red-text py-1 px-2 ml-auto btn-border">Sair</button>
          </Navbar>
        </div>
    )
  }
}


export default Nav;
