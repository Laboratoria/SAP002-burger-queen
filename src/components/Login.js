import React from "react"

import "./Login.css"

class Login extends React.Component {
    render () {
        return (
            <div className="login-page">
                <div className="logo">
                    <h1>Burger</h1>
                    <h3>QUEEN</h3>
                </div>
                <div className="login-wrap">
                    <div className="login-html">
                    <input
                        id="tab-1"
                        type="radio"
                        name="tab"
                        className="sign-in"
                        checked
                    />
                    <label for="tab-1" className="tab">
                        Entrar
                    </label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" />
                    <label for="tab-2" class="tab">
                        Cadastrar
                    </label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                        <div className="group">
                            <label for="user" className="label">
                            E-mail
                            </label>
                            <input id="user" type="text" className="input" />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">
                            Senha
                            </label>
                            <input
                            id="pass"
                            type="password"
                            className="input"
                            data-type="password"
                            />
                        </div>
                        <div className="checking">
                            <div className="group">
                            <input id="check" type="checkbox" className="check" checked />
                            <label for="check">
                                <span className="icon" /> Cozinha
                            </label>
                            </div>
                            <div className="group">
                            <input id="check" type="checkbox" className="check" checked />
                            <label for="check">
                                <span className="icon" /> Salão
                            </label>
                            </div>
                        </div>
                        <div className="group">
                            <input type="submit" className="button button-color" value="Entrar" />
                        </div>
                        <div className="hr" />
                        <div className="foot-lnk">
                            <a href="#forgot">Esqueceu a senha?</a>
                        </div>
                        </div>
                        <div className="sign-up-htm">
                        <div className="group">
                            <label for="user" className="label">
                            Endereço de e-mail
                            </label>
                            <input id="user" type="text" className="input" />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">
                            Senha
                            </label>
                            <input
                            id="pass"
                            type="password"
                            className="input"
                            data-type="password"
                            />
                        </div>
                        <div className="group">
                            <label for="pass" className="label">
                            Confirmar senha
                            </label>
                            <input
                            id="pass"
                            type="password"
                            className="input"
                            data-type="password"
                            />
                        </div>
                        <div className="checking">
                            <div className="group">
                            <input id="check" type="checkbox" className="check" checked />
                            <label for="check">
                                <span className="icon" /> Cozinha
                            </label>
                            </div>
                            <div className="group">
                            <input id="check" type="checkbox" className="check" checked />
                            <label for="check">
                                <span className="icon" /> Salão
                            </label>
                            </div>
                        </div>
                        <div className="group">
                            <input type="submit" className="button button-color" value="Cadastrar" />
                        </div>
                        <div className="hr" />
                        <div className="foot-lnk">
                            <label for="tab-1">Já tem cadastro?</label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login