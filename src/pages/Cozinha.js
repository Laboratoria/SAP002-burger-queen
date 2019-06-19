// import React from 'react';
// import { Card, CardHeader, CardBody, CardTitle, CardFooter, Button, Container, Row, Col, Input } from 'reactstrap';
// import capa from '../img/capa_face.jpg';
// import firebase from '../firebaseConfig';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// const database = firebase.firestore();
// const firebaseAppAuth = firebase.auth();

// class Cozinha extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cooker: '',
//       orders: []
//     };

//     firebaseAppAuth.onAuthStateChanged(user => {
//       database.collection("users").doc(user.uid).get()
//         .then(doc => {
//           const cooker = doc.data().name;
//           this.setState({ cooker })
//         });
//     });
//   }

//   componentDidMount() {
//     database.collection('orders').get()
//       .then((querySnapshot) => {
//         const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//         this.setState({ orders: data });
//       });
//   }

//   render() {
//     return (
//       <Container fluid>
//         <Card style={{ width: '80rem' }}>
//           <img src={capa} className="card-img-top" ></img>
//           <Row className="d-flex justify-content-center">
//             <h5>Bem vindo(a) {this.state.cooker}, <Link to="/"><Button color="warning"
//               onClick={this.clickSignOut}><i class="fas fa-sign-out-alt"></i> Sair</Button></Link></h5>
//           </Row>
//           <Card style={{ width: '78rem' }}>
//             <CardHeader>
//               <h3><i class="fas fa-clipboard-list"></i> Fila de espera:</h3>
//             </CardHeader>
//             <Row>
//               {this.state.orders.map((order, index) => {
//                 return <Col><Card key={index} style={{ width: '22rem' }}>
//                   <CardHeader className="d-flex justify-content-between">
//                     Cliente: {order.client} <b><i class="far fa-clock"></i> {order.hour}</b></CardHeader>
//                   <CardBody>{order.items.map((item, index) => {
//                     return <p key={index}>{item.quantidade} x {item.nome}</p>
//                   })} <Button color="warning"><i class="far fa-check-circle"></i> Pronto</Button></CardBody>
//                   <CardFooter><b>Atendente:</b> {order.waiter}</CardFooter>
//                 </Card></Col>
//               })}
//             </Row>
//           </Card>
//           <Card style={{ width: '78rem' }}>
//             <CardHeader>
//               <h3><i class="fas fa-clipboard-check"></i> Finalizados:</h3>
//             </CardHeader>
//           </Card>
//         </Card>
//       </Container>
//     );
//   }
// }

// export default Cozinha

