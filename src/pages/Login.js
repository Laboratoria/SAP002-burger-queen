import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth'
import './Login.css'
import LoginBox from '../components/LoginBox' 
import RegisterBox from '../components/RegisterBox'
import Logo from '../assets/image/logo.png'


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    }
    this.state = {
      isLoginOpen:true, 
      isRegisterOpen:false
    };
    this.state = {
      name:"",
      email:"",
      password: "", 
      setor:"hall"
    
    };
  }
showLoginBox () {
  this.setState({isLoginOpen:true, isRegisterOpen:false})
}  
showRegisterBox () {
  this.setState({isRegisterOpen:true, isLoginOpen:false});
}  

handleChange = (event, element) => {
  const newState = this.state;
  newState[element] = event.target.value
  this.setState(newState);
}

createUser = () => {
  this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((resp) => {
    database.collection("users").doc(resp.user.uid).set({
       email: this.state.email,
       name: this.state.name,
       setor: this.state.setor
      });
  })
  .then(() => {
    this.props.history.push(`/${this.state.setor}`);

  });
}

signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
   .then((resp) => {
     console.log(database,resp)
    database.collection("users").doc(resp.user.uid).get()
    .then(resp => {
      this.props.history.push(`/${this.state.setor}`);
      })
    })
}

  render() {
    console.log(this.state)
    if (this.props.error){
      if (this.props.error === "The email address is already in use by another account.") {
       alert ("O seu email já está cadastrado");
      }
    }
    return (

      <div className="root-container">
      <img src={Logo} classname="logo" alt="logo" />

      <div className="box-controller">
       <div className={"controller" + (this.state.isRegisterOpen? "selected-controller":"")}
       onClick={this.showLoginBox.bind(this)}>
       Login
       </div>
      <div className={"controller" + (this.state.isLoginOpen? "selected-controller":"")}
       onClick={this.showRegisterBox.bind(this)}>
       Cadastro
       </div>
       </div>

  
      <div className="box-container">
       {this.state.isLoginOpen && 
       <LoginBox 
       valueEmail={this.state.email}
       onChangeEmail={(e) => this.handleChange(e, "email")}
       valuePassword={this.state.senha}
       onChangePassword={(e) => this.handleChange(e, "password")}
       onClick={this.signIn}
        textBtn={"ENTRAR"}/>}
       </div>
         
      <div className="box-container">
      {this.state.isRegisterOpen && 
      <RegisterBox 
       valueName={this.props.name}
       onChangeName={(e) => this.handleChange(e, "name")}
       valueEmail={this.state.email}
       onChangeEmail={(e) => this.handleChange(e, "email")}
       valuePassword={this.state.senha}
       onChangePassword={(e) => this.handleChange(e, "password")}
       onChangeSetor={(e) => this.handleChange(e, "setor")}
       onClick={this.createUser}
        textBtn={"Cadastrar"}/>}
        
        </div>
      </div>
    )
  }
}


export default withFirebaseAuth({firebaseAppAuth,})(Login);
