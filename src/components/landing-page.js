import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './login-form';

export function LandingPage(props){
    const title = 'Veggie Might';

    return(
        <div className="center-container">
            <LoginForm title={title}/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default connect(mapStateToProps)(LandingPage);