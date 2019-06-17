import React from 'react';
import { Navbar} from 'react-bootstrap';
import logo from "../assets/img/logo-small.png"
import 'bootstrap/dist/css/bootstrap.css';


function Nav (props) {

    return (
        <div className="bg-red m-0 p-0">
          <Navbar variant="outline-light" expand="lg" className="mb-5">
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" className="w-25" />
              <span className="ml-5 white-text">Olá, {}</span>
            </Navbar.Brand>
            <button onClick={props.logout} className="red-text ml-auto btn btn-light">Sair</button>
          </Navbar>
        </div>
    )
  }

export default Nav;
