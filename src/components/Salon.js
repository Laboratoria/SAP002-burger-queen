import React, { Component } from 'react'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import './Salon.css'

const firebaseAppAuth = firebase.auth()
const database = firebase.firestore()

class Salon extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            place: "kitchen",
            listItem: []
        };
    }

    

    logoutUser = (event) => {
        console.log("teste", this.props)
        event.preventDefault()
        this.props.signOut()
        .then(() => {
            this.props.history.push('/')
        // Sign-out successful.
        })
        .catch(function(error) {
        // An error happened
        });
    }

    render() {
        return (
            <main className="salon-page">
                <div className="container">
                    <div className="salon-header">
                        <h1>Salão</h1>
                        <button onClick={this.logoutUser}>Sair</button>
                    </div>
                    <form className="waiter-info">
                        <label for="waiter-name">Nome do(a) garçom/garçonete</label>
                        <input type="text" id="text" name="waiter" placeholder="Digite seu nome" />
                        <label for="client">Nome do cliente</label>
                        <input type="text" id="client" name="client" placeholder="Digite o nome do cliente"/>
                        <label for="client">Pedido</label>
                        <Application />
                    </form>
                </div>
            </main>
        )
    }
}

class Application extends React.Component {
state = {
    options: [
        'Café Americano', 
        'Café com Leite', 
        'Sanduíche de presunto e queijo', 
        'Suco de fruta natural', 
        'Hamburguer simples com carne bovina', 
        'Hamburguer simples com frango',
        'Hamburguer simples vegetariano',
        'Hamburguer duplo com carne bovina', 
        'Hamburguer duplo com frango',
        'Hamburguer duplo vegetariano',
        'Batata frita',
        'Anéis de cebola',
        'Água 500ml',
        'Água 750ml',
        'Bebida com gás 500ml',
        'Bebida com gás 750ml'
    ],
    filter: ""
    }
    handleFilter = (newFilter) => {
    this.setState(() => ({
        filter: newFilter
    }));
    };
    render() {
    const list = this.state.options.filter(option => option.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
    <div>
        <Filter handleFilter={this.handleFilter} />
        {list.map((option) => <div className="menu"><p className="menu-list">{option}<button className="order-button" onClick={this.openModal} style={{ cursor: "pointer" }}>Pedir</button></p></div>)}
    </div>
    );
    };
}  
const Filter = (props) => (
<div>
    <input className="filter-list" name="filter" placeholder="Digite o pedido do cliente" onChange={(e) => {
        props.handleFilter(e.target.value);
        }}/>
</div>
);





export default withFirebaseAuth({
    firebaseAppAuth,
})(Salon)