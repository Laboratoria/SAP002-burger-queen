import React from 'react';
// import './App.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';const firebaseAppAuth = firebase.auth();

const database = firebase.firestore();

class Home extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     name: "",
     email: "",
     senha: "",
     tipo: "salao",
     listIntem: []

   }
 }  
 
  handleChange = (event, element) => {
   const newState = this.state;
   newState[element] = event.target.value
   this.setState(newState);
 }  
  createUser = (e) => {
   e.preventDefault();
   this.props.createUserWithEmailAndPassword
     (this.state.email, this.state.senha)
     .then(resp => {
      if(resp){
       console.log(resp)
       const id = resp.user.uid;
       database.collection('users').doc(id).set({
         email: this.state.email,
         name: this.state.name,
         tipo: this.state.tipo
       })
       .then(() =>{
          this.props.history.push(`/${this.state.tipo}`);
         alert("usuário criado")
        });
      }

    })
     .catch(error => alert(error));
  }  

 signIn = (e) => {
  e.preventDefault();
   this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
   .then((resp) => { 
     const id = resp.user.uid;
     database.collection('users').doc(id).get()
     .then(resp =>{
       const data = resp.data();
        this.props.history.push(`/${data.tipo}`);
      })
    });
 }  
 render() {
   if(this.props.error){
     alert(this.props.error)
   }  

   return (
     <div className="App">
       <header className="App-header">
         <div className="background-image">
           <figure className="logo"><img scr="../images/logo.png"></img></figure>
         </div>
         <main className="container">
           <form className="section-sign-in">
             <input className="sign-up-name rounded-border" value={this.state.name} placeholder="name completo" onChange={(e) => this.handleChange(e, "name")} />
             <input className="sign-in-email rounded-border" value={this.state.email} placeholder="Digite seu email" onChange={(e) => this.handleChange(e, "email")} />
             <input className="sign-in-password rounded-border" value={this.state.senha} placeholder="Digite sua senha" onChange={(e) => this.handleChange(e, "senha")} />
             <select onChange={(e) => this.handleChange(e, "tipo")} className="sign-up-gender rounded-border">
               <option value="salao" >Salão</option>
               <option value="cozinha">Cozinha</option>
             </select>
             <section>
               <Button className="sign-in-button " text="CADASTRAR" onClick={this.createUser} />
               <Button className="sign-in-button " text="LOGAR" onClick={this.signIn} />
             </section>
           </form>
         </main>
       </header>
     </div>
   )
 }

}export default withFirebaseAuth({ firebaseAppAuth, })(Home);

