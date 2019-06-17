import React, { Component } from 'react'
import './Signup.css'

class Signup extends Component {
    render() {
        return (
            <main className="page">
                <div className="signup-logo">
                    <h1>Burger</h1>
                    <h3>QUEEN</h3>
                </div>
                <div className="signup-container">
                    <div className="signup">
                        <h2>CADASTRAR</h2>
                        <div className="signup-line"></div>
                    </div>
                    <form className="login-form">
                        <label for="email">Endereço de e-mail</label>
                        <input type="text" id="email" name="email" placeholder="Digite seu e-mail" />
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" />
                        <label for="password">Confirmar Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" />
                        <select name="category">
                            <option value="">-- Escolha uma categoria --</option>
                            <option value="kitchen">Cozinha</option>
                            <option value="salon">Salão</option>
                        </select>
                        <input type="submit" value="Cadastrar"></input>
                        <p className="signup-link">Já Tem Cadastro? Entre Aqui</p>
                    </form>
                </div>
            </main>
        )
    }
}

export default Signup