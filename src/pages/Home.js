import React from 'react';
import firebase from "../firebaseConfig";
import Button from "../components/Button"
import Input from "../components/Input"
import withFirebaseAuth from 'react-with-firebase-auth';
import Logo from "../components/Logo";
import TabMenu from "../components/Tab"

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userType: '',
      name: ''
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    const { email, name, userType } = this.state;
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        const id = resp.user.uid;
        database.collection("users").doc(id).set({
          email,
          name,
          userType
        });
    })
      .then( () =>{
        this.props.history.push(`/${this.state.userType}`);
      });
    }
   
  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((resp) => {
      const id = resp.user.uid;
      database.collection("users").doc(id).get()
        .then(resp => {
          const data = resp.data();
          this.props.history.push(`/${data.userType}`);
        })
    });
  }

  render() {
    const { email, password, name } = this.state;

    return (
      <div>
        <Logo />
        <div className="main-body">
          {
            <TabMenu 
            text1="LOGIN"
            text2="CRIAR CONTA"
            content1= {
              <div>
              <Input 
              type="email" 
              value={email} 
              placeholder="Digite seu email"
              onChange={(e) => this.handleChange(e, "email")} 
            />
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => this.handleChange(e, "password")} 
              placeholder="Digite sua senha"
            />
           <Button text="Login" onClick={this.signIn}/>
           </div>
            }
            content2= {
              <div>
              <Input 
              type="text" 
              value={name} 
              placeholder="Nome"
              onChange={(e) => this.handleChange(e, "name")}
            />
            <select className="input-box" onChange={(e) => this.handleChange(e, "userType")}>
			        <option selected disabled>Setor</option>
			        <option value="kitchen" >Cozinha</option>
			        <option value="saloon">Salão</option>
			      </select>
            <Input 
              type="email" 
              value={email} 
              placeholder="Digite seu email"
              onChange={(e) => this.handleChange(e, "email")} 
            />
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => this.handleChange(e, "password")} 
              placeholder="Digite sua senha"
            />
            <Button text="Criar Conta" onClick={this.createUser}/>
            </div>
            }
            />
           }
        </div>
        </div>
    )
  }
}

export default withFirebaseAuth({firebaseAppAuth}) (Home);