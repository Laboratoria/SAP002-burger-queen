import React from 'react';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';
import DashboardHeader from '../components/DashboardHeader';
import Saloon from '../pages/Saloon'
import Kitchen from '../pages/Kitchen'
import Input from '../components/Input';
import Button from '../components/Button';
import '../components/Components.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Dashboard extends React.Component{
    constructor(props) {
        super();
        this.props = props;

        if(sessionStorage.getItem('user')){
            sessionStorage.getItem('id');
            sessionStorage.getItem('name');
            sessionStorage.getItem('type');        
        } else{
            this.props.history.push('/Login');
        }

        
    }
    
    render() {
    
        const pageType = (sessionStorage.getItem('type') === 'saloon') ? <Saloon/> : <Kitchen/>;
        
        return (
            <>
                <DashboardHeader />

                {pageType}
            </>
            )
        }
    }

export default Dashboard;