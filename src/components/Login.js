import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
    render() {
        return (
            <main className="page">
                <div className="logo">
                    <h1>Burger</h1>
                    <h3>QUEEN</h3>
                </div>
                <div className="container">
                    <div className="enter">
                        <h2>ENTRAR</h2>
                        <div className="enter-line"></div>
                    </div>
                    <form className="login-form">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" placeholder="Digite seu e-mail" />
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" />
                        <select name="category">
                            <option value="">-- Escolha uma categoria --</option>
                            <option value="kitchen">Cozinha</option>
                            <option value="salon">Salão</option>
                        </select>
                        <input type="submit" value="Entrar"></input>
                        <h3 className="signup-link">Não tem cadastro? Entre aqui</h3>
                    </form>
                </div>
            </main>
        )
    }
}

export default Login