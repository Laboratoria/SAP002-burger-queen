import React from 'react';
import logo from '../images/logo.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Button from '../components/Button';


const firebaseAppAuth = firebase.auth();

class DashboardHeader extends React.Component{

    constructor(props) {
        super();
        this.props = props;
    }
    
signOut = () => {
    firebaseAppAuth.signOut()
    .then(() => {
        sessionStorage.clear();
        window.location = '/';
    })
};

render (){
    return (
        <>
            <header className="Align">
                <p>{sessionStorage.getItem('name')}</p>
                <img className="Logo-dashboard-header" src={logo} alt="BURGER QUEEN"/>
                <Button text="SAIR" onClick={this.signOut} />
            </header>
        </>
        );

    }
        
}

export default withFirebaseAuth({firebaseAppAuth,})(DashboardHeader);