import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './styles/center.css';

export function LoginForm(props){
    function tryLogin(event){
        event.persist();
        console.log(event);
        event.preventDefault();
        props.dispatch(login('test','test'))

        .then(user => {
            console.log('current user', props.currentUser);
        })

        .catch(err => {
            console.log('error logging in', props.error);
        })
        
    }
    return(
        <div className="login-container center-container">
            <form onSubmit={(e) => tryLogin(e)}>
                <TextField id="user" label="Email" variant="outlined" />
                <TextField id="password" label="Password" variant="outlined" type="password"/>
                <Button variant="contained" color="primary" type="submit">Test</Button>
            {console.log(props.currentUser,props.error)}
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default connect(mapStateToProps)(LoginForm);