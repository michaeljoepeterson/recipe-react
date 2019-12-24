import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './styles/center.css';
import './styles/login.css';
import { Redirect } from 'react-router';

export function LoginForm(props){
    if(props.currentUser){
        return <Redirect to='/create-recipe'/>;
    }
    function tryLogin(event){
        event.persist();
        console.log(event);
        const email = event.target[0].value;
        const pass = event.target[1].value;
        event.preventDefault();
        props.dispatch(login(email,pass))

        .then(user => {
            console.log('current user after login', user);
        })

        .catch(err => {
            console.log('error logging in', props.error);
        })
        
    }
    return(
        <div className="login-container center-container">
            <form className="login-form" onSubmit={(e) => tryLogin(e)}>
                <h1 className="form-title">{props.title}</h1>
                <div className="input-container">
                    <TextField required id="user" label="Email" variant="outlined" helperText={props.error ? 'Error Loging in' : ''}/>
                </div>
                <div className="input-container">
                    <TextField required id="password" label="Password" variant="outlined" type="password" helperText={props.error ? 'Error Loging in' : ''}/>
                </div>
                <div className="input-container">
                    <Button variant="contained" color="primary" type="submit">Login</Button>
                </div>
            {console.log('render user: ',props.currentUser,props.error)}
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error
});
export default connect(mapStateToProps)(LoginForm);