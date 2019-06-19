import React from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'

const Cabecalho = props => {
    return (
      <div>
        <div className='jumbotron text-center'>
          <h1>Burger Queen</h1>
          <p>O melhor hambuguer de São Paulo</p>
    
        </div>
        <nav className='navbar navbar-fixed-top'>
        <div className='container'>
            <div className='navbar-header logo'>    
            </div>
            <div className='collapse navbar-collapse' id='myNavbar'>
                <ul className='nav navbar-nav navbar-right'>
                    <li><Link to='/'>Inicio</Link></li>
                    <li><Link to='/contatos'>Contato</Link></li>
                </ul>
            </div>
        </div>
  		</nav>
    </div>
		)
}

export default Cabecalho;