import React from 'react';
import Button from '../Button';
import firebase from "../firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect, Link }
    from 'react-router-dom';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            place: "",
            listItem: []
        };
    }

    // componentDidMount() {
    //     database.collection('laboratoria').get()
    //         .then((querySnapshot) => {
    //             const data = querySnapshot.docs.map(doc => doc.data());
    //             this.setState({ listItem: data });
    //         });
    // }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    }

    // handleClick = () => {
    //     const object = {
    //         email: this.state.email,
    //         name: this.state.name,
    //         place: this.state.place,
    //     }
    //     database.collection('Usuarios').add(object)
    //     this.setState({
    //         listItem: this.state.listItem.concat(object)
    //     })
    // }

    createUser = () => {
        this.props.createUserWithEmailAndPassword
            (this.state.email, this.state.password)
            .then((response) => {
                database.doc(`users/${response.user.uid}`)
                    .set({
                        email: this.state.email,
                        name: this.state.name,
                        place: this.state.place,

                    });
                    
                alert("Cadastro feito com sucesso!");
            });
    }


    render() {
        //console.log(this.props.user);
        return (
            <div>
                <h1>Burger Queen Cadastro</h1>
                <input value={this.state.email}
                    placeholder="e-mail"
                    onChange={(e) => this.handleChange(e, "email")} />
                <input value={this.state.name}
                    placeholder="nome"
                    onChange={(e) => this.handleChange(e, "name")} />
                <input value={this.state.place}
                    placeholder="local"
                    onChange={(e) => this.handleChange(e, "place")} />
                <input value={this.state.password}
                    placeholder="senha"
                    onChange={(e) => this.handleChange(e, "password")} />

                <Button text="Cadastrar" onClick={this.createUser} />

                {/* {
                    this.state.listItem.map((item, index) => {
                        return <p key={index}>
                            {item.email} | {item.name} | {item.place}</p>
                    })
                } */}
            </div>
        );
    }
}


export default withFirebaseAuth({
    firebaseAppAuth,
})(App);


//<Link to="teste link">Oiii</Link>