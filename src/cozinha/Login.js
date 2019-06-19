import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

import { auth } from './../firebaseConfig'


class Login extends Component {
    constructor(props){
        super(props)

        this.state ={
          estaAutenticado: false,
          estaLogando: false,
          erro: false
        }

        this.email = null
        this.senha = null

        this.autenticaUsuario = this.autenticaUsuario.bind(this)
    }

    autenticaUsuario(){
      this.setState({estaLogando: true, erro: false})
      auth.signInWithEmailAndPassword(this.email.value, this.senha.value)
        .then(user => {
          console.log('Usuário Logado', user)
          this.setState({estaAutenticado: true})
        })
        .catch(err =>{
          console.log('Erro', err)
          this.setState({erro: true, estaAutenticado: false, estaLogando: false})
        })
    }

    render() {
      if(this.state.estaAutenticado){
        //aqui colocar para fazer os pedidos
        return <Redirect to= '/menu' />

      }
			return (
        <div className="container">
					<h1>Tela de Login</h1>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" name="email" ref={ ref => this.email = ref } className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email"/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Senha</label>
            <input type="password" name= "senha" ref={ ref => this.senha = ref }className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            {this.state.erro && <small id="emailHelp" className="form-text text-muted">Email e/ou senha inválidos</small>}
          </div>
          <button type="button" disable= {this.state.estaLogando} className="btn btn-primary" onClick={ this.autenticaUsuario }>Submit</button>	

          {/*colocar link da tela de cadastro*/}
          <Link className='container' to=''>Caso nao tenha cadastro clique aqui</Link>
        </div>
      )
		}
}


export default Login;