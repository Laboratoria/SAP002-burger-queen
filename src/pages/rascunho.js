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







import React from 'react';
// import './App.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const firebaseAppAuth = firebase.auth();

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
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
      this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha, this.state.name)
      alert("usuário criado")
    }

    signIn = () => {
      this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      alert('logado')
    }




    
    render() {
     
      return(
        <div className="App">
           <header className="App-header">
           <figure className="logo"><img scr="../images/logo-ms.png"></img></figure>
           </header>
           <main className="container">         
              <ul class="edit-align">
                  <li className="sign-in font-size-m choice-login active">LOGIN</li>
                  <li className="sign-up font-size-m choice-login">CADASTRO</li>
              </ul>
              <form className="section-sign-in">
                  <input className="sign-in-email rounded-border" value={this.state.email} placeholder="Digite seu email" onChange={(e)=> this.handleChange(e,"email")}/>
                  <input className="sign-in-password rounded-border" value={this.state.senha}  placeholder="Digite sua senha"  onChange={(e)=> this.handleChange(e,"senha")} />
                                   
                  <select className="sign-up-gender rounded-border">
                      <option selected>Cozinha</option>
                      <option>Salão</option>
                     
                  </select>
                    <section>
                    <p className="font-size-p"><u>Esqueci a senha</u></p>
                    <div>
                    <input type="checkbox" className="form-check-input" id="checkbox-reminder"/>
                    <label className="font-size-p" for="checkbox-reminder">Continuar Logado</label>                     
                    </div>
                    <Button className="sign-in-button " text="LOGAR" onClick ={this.signIn}/>
                   

                  </section>

                  
                </form>
                <form className="section-sign-up ">
                    <input type="text" className="sign-up-name rounded-border" value={this.state.name} placeholder="Nome completo" onChange={(e)=> this.handleChange(e,"name")}/>
                    <input className="sign-in-email rounded-border" value={this.state.email} placeholder="Digite seu email" onChange={(e)=> this.handleChange(e,"email")}/>
                    <input className="sign-in-password rounded-border" value={this.state.senha}  placeholder="Digite sua senha"  onChange={(e)=> this.handleChange(e,"senha")} />
                                
                    <Button className="sign-in-button " text="CADASTRAR" onClick ={this.signUp}/>
                   
                </form>


           

             
           </main>

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





// <select > 
// <option value={this.state.type} onChange={(e)=> this.handleChange(e,"type")} selected>Cozinha</option>
// <option value={this.state.type} onChange={(e)=> this.handleChange(e,"type")} selected>Salão</option>                   
// </select>



import React from 'react';
// import './App.css';
import Button from '../button';
// import Counter from './counter.js;'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

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
      this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha, )
      alert("usuário criado")
    }

    signIn = () => {
      this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
      alert('logado')
    }




    
    render() {
     
      return(
        <div className="App">
           <header className="App-header">
            <div class="background-image">
                
            </div>  
           
           
           <main className="container">         
             
              <form className="section-sign-in">
              <input type="text" className="sign-up-name rounded-border" value={this.state.name} placeholder="Nome completo" onChange={(e)=> this.handleChange(e,"name")}/>
                  <input className="sign-in-email rounded-border" value={this.state.email} placeholder="Digite seu email" onChange={(e)=> this.handleChange(e,"email")}/>
                  <input className="sign-in-password rounded-border" value={this.state.senha}  placeholder="Digite sua senha"  onChange={(e)=> this.handleChange(e,"senha")} />
                  <select className="sign-up-gender rounded-border">
                      <option selected>Cozinha</option>
                      <option>Salão</option> 
                  </select>               
                 
                  <section>                 
                    <Button className="sign-in-button " text="CADASTRAR" onClick ={this.createUser}/>
                     <Button className="sign-in-button " text="LOGAR" onClick ={this.signIn}/>
                  </section>

                </form>
               
           </main>
           </header>
       </div>
      )
    }
}

export default withFirebaseAuth ({
  firebaseAppAuth,


})(Home);

 <div className="App">
           <header className="App-header">
           <main className="container"> 
           <form>
           <input type="text" className="sign-up-name rounded-border" value={this.state.name} placeholder="Nome completo" onChange={(e)=> this.handleChange(e,"name")}/> 
           <input className="sign-in-email rounded-border" value={this.state.email} placeholder="Digite seu email" onChange={(e)=> this.handleChange(e,"email")}/>
           <input className="sign-in-password rounded-border" value={this.state.senha}  placeholder="Digite sua senha"  onChange={(e)=> this.handleChange(e,"senha")} /> 
           <select className="sign-up-gender rounded-border">
                      <option selected>Cozinha</option>
                      <option>Salão</option> 
            </select> 
             <Button text="cadastro" onClick ={this.createUser}/>
             <Button text="Login" onClick ={this.signIn}/>
             </form>
            </main> 
           </header>

       </div>

