import React from 'react';
import Input from '../components/Input'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Button from '@material-ui/core/Button';
import logo_pb from '../images/logo_pb.png';

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      tipo: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value
    this.setState(newState);
  }

  createUser = () => {
    console.log(this.state)
    this.props.createUserWithEmailAndPassword(
      this.state.email, this.state.password)
      .then(resp => {
        if (resp) {
          if (this.state.tipo === "Salao" || this.state.tipo === "Kitchen") {
            const id = resp.user.uid;
            database.collection("users").doc(id).set({
              email: this.state.email,
              name: this.state.name,
              tipo: this.state.tipo
            })
              .then(() => {
                this.props.history.push(`/${this.state.tipo}`);
              });
          } else {
            alert("Preencha todos os campos")
          }
        }
      })
  }

  render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    console.log(this.props.user)
    return (
      <div>
        <img src={logo_pb} className="logo" />
        <h2 className="boasvindas">Bem vindo! <br></br>Insira abaixo seu login ou cadastre-se.</h2>
        <Input value={this.state.name}
          text="Nome"
          onChange={(e) => this.handleChange(e, "name")} />
        <Input value={this.state.email}
          text="E-mail"
          onChange={(e) => this.handleChange(e, "email")} />
        <Input value={this.state.password} type="password"
          text="Senha"
          onChange={(e) => this.handleChange(e, "password")} />
        <select value={this.state.tipo} type="password"
          onChange={(e) => this.handleChange(e, "tipo")}>
          <option>Selecione</option>
          <option>Kitchen</option>
          <option>Salao</option>
        </select>
        <br></br><br></br>
        <Button onClick={this.createUser} variant="contained" color="secondary">Criar usuário</Button>
      </div>
    )
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(Register);
