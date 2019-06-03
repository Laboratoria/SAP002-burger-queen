// import React from 'react';
// import '../Form.css'
// import Button from '../Button'
// import firebase from '../firebase-config';
// import withFirebaseAuth from 'react-with-firebase-auth';

// const firebaseAppAuth = firebase.auth();

// class SignUp extends React.Component {
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

//   createUser = () => {
//     this.props.createUserWithEmailAndPassword(this.state.email, this.state.senha);
//     alert('Usuário cadastrado com sucesso!');
//     this.props.history.push("/Login");
//   }

//   render() {
//     return (
//       <div>
//         <input value={this.state.userName}
//           placeholder='userName'
//           onChange={(e) => this.handleChange(e, 'userName')} />
//         <input value={this.state.email}
//           placeholder='email'
//           onChange={(e) => this.handleChange(e, 'email')} />
//         <input value={this.state.senha}
//           placeholder='senha'
//           onChange={(e) => this.handleChange(e, 'senha')} />
//         <Button text='Cadastrar' onClick={this.createUser} />
//       </div>
//     )
//   }
// }

// export default withFirebaseAuth({
//   firebaseAppAuth,
// })(SignUp);

// // export default SignUp
