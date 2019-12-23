import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import Button from '@material-ui/core/Button';

export function LandingPage(props){
    function tryLogin(){
        props.dispatch(login('test','test'))

        .then(user => {
            console.log('current user', props.currentUser);
        })

        .catch(err => {
            console.log('error logging in', props.error);
        })
        
    }

    return(
        <div>
            <Button variant="contained" color="primary" onClick={tryLogin}>Test</Button>
            {console.log(props.currentUser,props.error)}
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default connect(mapStateToProps)(LandingPage);