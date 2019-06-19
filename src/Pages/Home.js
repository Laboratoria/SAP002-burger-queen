import React from 'react';
import Input from '../components/Input'
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Button from '@material-ui/core/Button';
import logo_pb from '../images/logo_pb.png';


const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Home extends React.Component {
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

  signIn = () => {
    const { email, password } = this.state;
    const { signInWithEmailAndPassword } = this.props;
    signInWithEmailAndPassword(email, password)
      .then((resp) => {
        if (resp) {
          const id = resp.user.uid;
          database.collection("users").doc(id).get()
            .then(resp => {
              const data = resp.data();
              this.props.history.push(`/${data.tipo}`);
            })
        }
      })
  }

  createUser = () => {
    this.props.history.push(`../Register`);
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
        <Input value={this.state.email}
          text="E-mail"
          onChange={(e) => this.handleChange(e, "email")} />
        <Input value={this.state.password} type="password"
          text="Senha"
          onChange={(e) => this.handleChange(e, "password")} />
        <br></br><br></br>
        <Button onClick={this.signIn} variant="contained" color="primary">Login</Button>
        <p>ou</p>
        <Button onClick={this.createUser} variant="contained" color="inherit">Criar usuário</Button>
      </div>
    )
  }
}


export default withFirebaseAuth({
  firebaseAppAuth,
})(Home);
