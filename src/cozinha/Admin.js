import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import {auth} from './../firebaseConfig'
import AdminMenu from './AdminMenu'
import AdminPortifolio from './AdminPortifolio'

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            estaLogando: true,
            estaAutenticado: false,
            user: null
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({
                estaLogando: false,
                estaAutenticado: !!user,
                user
            })
        })
    }

    render() {
			if(this.state.estaLogando) {
				return(
					<div className="container">
						<p><span className="glyphicon glyphicon-refresh"/>Aguarde ...</p>
					</div>
						
				)
			}

			if(!this.state.estaAutenticado) {
				return <Redirect to= '/login' />
			}

        return (
            <div className="container">
                <h2>Cardápio</h2>
                <Route path = {`/`} component = { AdminMenu } />
                <Route path = {`${this.props.match.url}/portifolio`} component = {AdminPortifolio} />

            </div>
        )
    }
}

export default Admin;