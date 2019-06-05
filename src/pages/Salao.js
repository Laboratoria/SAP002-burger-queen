import React from 'react';
// import './App.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();


class Salao extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email:"",
      senha:"",
      banana: "",
      peixinho: "",   
      listIntem: []

    }
  }
  componentDidMount(){
    database.collection('laboratoria').get()
    .then((querySnapshot)=> {
      const data= querySnapshot.docs.map(doc =>doc.data())
      this.setState({listIntem: data})

    });
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element]=event.target.value
    this.setState(newState);
  }

  handleClick = ()=> {
    const object = {
      banana: this.state.banana,
      peixinho: this.state.peixinho,
      email: this.state.email,
      senha: this.state.senha
     
      
    }
    database.collection('laboratoria').add(object)
    this.setState({
      listIntem: this.state.listIntem.concat(object).reverse()
      
      })
    }   
    
    render() {
      console.log(this.props.user)
            return(
        <div className="App">
           <header className="App-header">          
            <input value={this.state.peixinho}
             placeholder="Digite seu peixinho"
             onChange={(e)=> this.handleChange(e,"peixinho")} />
            <input value={this.state.banana}
             placeholder="Digite sua banana"
             onChange={(e)=> this.handleChange(e,"banana")} />
    
             <Button text="publicar" onClick ={this.handleClick}/>
             {
               this.state.listIntem.map(item =>{
                 return <p > {item.banana} | {item.peixinho}</p>
               })
             }
    
           </header>
       </div>
      )
    }
}


export default withFirebaseAuth ({
  firebaseAppAuth,
})(Salao);



