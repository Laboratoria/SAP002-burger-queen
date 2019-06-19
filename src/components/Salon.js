import React, { Component } from 'react'
import menuData from './Menu'
import firebase from '../firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import { Link } from 'react-router-dom'
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
                    <form className="salon-info">
                        <label for="waiter">Nome do(a) garçom / garçonete</label>
                        <input type="text" id="waiter" name="waiter" placeholder="Digite seu nome" />
                        <label for="client">Nome do(a) cliente</label>
                        <input type="text" id="client" name="client" placeholder="Digite o nome do(a) cliente" />
                    </form>
                    <MenuFilter />
                </div>
            </main>
        )
    }
}

class MenuFilter extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        isBreakfastChecked: true,
        isRestOfTheDayChecked: true,
    }
}
breakfastChangeState() {
    this.setState({
        isBreakfastChecked: !this.state.isBreakfastChecked
    });
}

restOfTheDayChangeState() {
    this.setState({
    PDXisChecked: !this.state.PDXisChecked
    });
}

render() {
return (
    <div className="menuMainContainer">
    <div className="menuFilterBox">
        <div className="filter">
            <input type="checkbox" id="breakfast" name="breakfast" value="breakfast" onChange={this.breakfastChangeState.bind(this)} checked={this.state.isBreakfastChecked} />
            <label for="breakfast">Café da manhã</label>
        </div>
        <div className="filter">
            <input type="checkbox" id="restOfTheDay" name="restOfTheDay" value="restOfTheDay"  onChange={this.restOfTheDayChangeState.bind(this)} checked={this.state.isRestOfTheDayChecked} />
            <label for="restOfTheDay">Resto do dia</label>
        </div>
        </div>
        <div className="menuBox">
        {this.state.isBreakfastChecked && 
        <div className="menu-card-pic">
            <MenuOptionCard />
        </div>}
        </div>
    </div>
    );
}
}

function MenuCard (props) {
    const menuOptions = menuData.map(option => 
    <MenuOptionCard 
    key={option.id}
    img={option.img}
    item={option.item} 
    price={option.price}/>)
    return (        
        <div className="menu-row">
            {menuOptions}
        </div>
    )
}

function MenuOptionCard (props) {
    return (
        <div>
            <div>{props.img}</div>
            <h3>{props.item}</h3>
            <p>{props.price}</p>
        </div>
    )
}




export default withFirebaseAuth({
    firebaseAppAuth,
})(Salon)