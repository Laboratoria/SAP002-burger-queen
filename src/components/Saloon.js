import React from 'react';
import Button from './Button';
import './Saloon.css';
import logoBurgerQueen from '../assets/logo-burger-queen.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { Form, FormCheck, FormControl, Row, Col, Container, ListGroup, Card, CardGroup, Nav, TabContainer, Tabs, Tab, TabContent, TabPane } from 'react-bootstrap';

const firebaseAppAuth = firebase.auth();

class Saloon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: ""
		};
	}

	handleChange = (event, element) => {
		const newState = this.state;
		newState[element] = event.target.value
		this.setState(newState);
	}



	render(props) {
		return (
			<div className="div-header">
				<Container>
					<Col xs={6} md={6} lg={12} >
						<div className="div-header-saloon">
							<div className="div-logo-saloon">
								<img src={logoBurgerQueen} className="logo-saloon" alt="logo do Burger Queen, coroa acima do nome" />
							</div>
							<div className="client-name-input">
								<Form>
									<Form.Group as={Row} className="form-client-name" controlId="formHorizontalName">
										<Form.Control type="text" placeholder="Nome do Cliente" />
									</Form.Group>
								</Form>
							</div>
							<div className="div-user-name">
								<FontAwesomeIcon icon={faUserCircle} className="user-name" />
								<p></p>
							</div>
						</div>


						<div className="div-itens" >
							<div className="tabs-saloon">
								<Tabs defaultActiveKey="breakfast" transition={false} id="noanim-tab-example" className="tabs">
									<Tab eventKey="breakfast" title="Café da Manhã" className="nav-link tab-content-saloon">

										<div list-saloon>
											<ListGroup>
												<Row>
													<Col sm={8}>
														<ListGroup.Item disabled>Item</ListGroup.Item>
													</Col>
													<Col sm={4}>
														<ListGroup.Item disabled>Preço R$ </ListGroup.Item>
													</Col>
												</Row>
												<Row>
													<Col sm={8}>
														<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Café Americano</ListGroup.Item>
													</Col>
													<Col sm={4}>
														<ListGroup.Item>10,00</ListGroup.Item>
													</Col>
												</Row>
												<Row>
													<Col sm={8}>
														<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Café com leite</ListGroup.Item>
													</Col>
													<Col sm={4}>
														<ListGroup.Item>15,00</ListGroup.Item>
													</Col>
												</Row>
												<Row>
													<Col sm={8}>
														<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Sanduíche de queijo e presunto</ListGroup.Item>
													</Col>
													<Col sm={4}>
														<ListGroup.Item>1,00</ListGroup.Item>
													</Col>
												</Row>
												<Row>
													<Col sm={8}>
														<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Suco de fruta</ListGroup.Item>
													</Col>
													<Col sm={4}>
														<ListGroup.Item>1,00</ListGroup.Item>
													</Col>
												</Row>
											</ListGroup>
										</div>
									</Tab>

									<Tab eventKey="lunches" title="Lanches e Bebidas" className="nav-link tab-content-saloon">

										<ListGroup>
											<Row>
												<Col sm={8}>
													<ListGroup.Item disabled>Item</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item disabled>Preço R$</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item disabled>Hamburgueres</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Hamburguer Simples</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>10,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Hamburguer Duplo</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>15,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Carne Bovina</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Frango</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Vegetariano</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item disabled>Adicionais</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Ovo</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>1,0</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Queijo</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>1,0</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item disabled>Acompanhamentos</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Batata Frita</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>5,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Anéis de Cebola</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>5,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item disabled>Bebidas</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Água 500ml</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>5,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Água 750ml</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>7,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Bebida gaseificada 500ml</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>7,00</ListGroup.Item>
												</Col>
											</Row>
											<Row>
												<Col sm={8}>
													<ListGroup.Item><FontAwesomeIcon icon={faPlusCircle} /> Bebida gaseificada 750ml</ListGroup.Item>
												</Col>
												<Col sm={4}>
													<ListGroup.Item>10,00</ListGroup.Item>
												</Col>
											</Row>
										</ListGroup>
									</Tab>
								</Tabs>
							</div>

							<div className="list-itens">
								<ListGroup>
									<ListGroup.Item className="item-checked" disabled>Pedido(s)</ListGroup.Item>
								</ListGroup>
								<Col xs={6} md={6} lg={12} className="justify-content-md-center btn-col">
									<Button text="Confirmar Pedido(s)" />
								</Col>
							</div>
						</div>

					</Col>
				</Container>
			</div >

		);
	}
}

export default Saloon;
// export default withFirebaseAuth({
// 	firebaseAppAuth,
// })(SignInAndCreateUser);
