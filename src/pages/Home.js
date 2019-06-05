import React from 'react';
// import './App.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      senha:"",            
      listIntem: []
    }
  }
  

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element]=event.target.value
        this.setState(newState);
    } 

    createUser = () => {
      this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha)
      alert("usuário criado")
    }

    signIn = () => {
      this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      alert('logado')
    }
    
    render() {
      console.log(this.props)
      return(
        <div className="App">
           <header className="App-header">
           <input value={this.state.email}
             placeholder="Digite seu email"
             onChange={(e)=> this.handleChange(e,"email")} />
            <input value={this.state.senha}
             placeholder="Digite sua senha"
             onChange={(e)=> this.handleChange(e,"senha")} />
    
             <Button text="cadastro" onClick ={this.createUser}/>
             <Button text="Login" onClick ={this.signIn}/>
           </header>
       </div>
      )
    }
}

export default withFirebaseAuth ({
  firebaseAppAuth,
})(Home);



// class App extends React.Component {
//   render(){
//     return(
//       <div>
//         <Counter initialCounter={40} color="blue"/>
//       </div>
//     )
//   }


// }


