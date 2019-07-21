import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Saloon from '../pages/Saloon'
import Kitchen from '../pages/Kitchen'
import '../components/Components.css'
import './Menu.css'

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