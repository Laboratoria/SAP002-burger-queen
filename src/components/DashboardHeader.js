import React from 'react';
import logo from '../images/logo.png';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import Button from '../components/Button';

const firebaseAppAuth = firebase.auth();

class DashboardHeader extends React.Component{

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
            <header className="Align-dashboard-header">
                <p className="Person-name">{sessionStorage.getItem('name')}</p>
                <img className="Logo-dashboard-header" src={logo} alt="BURGER QUEEN"/>
                <Button className="Sign-out" text="Sair" onClick={this.signOut} />
            </header>
        </>
        );

    }
        
}

export default withFirebaseAuth({firebaseAppAuth,})(DashboardHeader);