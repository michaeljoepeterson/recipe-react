import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './login-form';

export function LandingPage(props){
    

    return(
        <div className="center-container">
            <LoginForm />
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default connect(mapStateToProps)(LandingPage);