// import React from 'react';
// import '../Form.css'
// import Button from '../Button'
// import firebase from '../firebase-config';
// import withFirebaseAuth from 'react-with-firebase-auth';

// const firebaseAppAuth = firebase.auth();

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       senha: '',
//       userName: '',
//     };
//   }

//   handleChange = (event, element) => {
//     const newState = this.state;
//     newState[element] = event.target.value
//     this.setState(newState);
//   }

//   signIn = () => {
//     // como verificar se o usuário está logado?
//     console.log(this.state);
//     console.log('>>>>', this.props.user);

//     this.props.signInWithEmailAndPassword(this.state.email, this.state.senha)
//       .then(() => {
//         const userType = this.refs.userType.value;
//         if (userType === 'saloon') {
//           this.props.history.push("/Saloon");
//         } else {
//           this.props.history.push(`/Kitchen`);
//         }
//       })
//       .catch(error => alert(this.setState({ error })))
//   }

//   render() {
//     return (
//       <div>
//         <select ref='userType'>
//           <option value="kitchen">Cozinha</option>
//           <option value="saloon">Salão</option>
//         </select>
//         <input value={this.state.email}
//           placeholder='email'
//           onChange={(e) => this.handleChange(e, 'email')} />
//         <input value={this.state.senha}
//           placeholder='senha'
//           onChange={(e) => this.handleChange(e, 'senha')} />
//         <Button text='Entrar' onClick={this.signIn} />
//       </div>
//     )
//   }
// }

// export withFirebaseAuth({
//   firebaseAppAuth,
// })(SignIn);

// // export default SignIn
