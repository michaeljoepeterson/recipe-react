import React from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/authActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles/center.css';
import './styles/login.css';

export class LoginForm extends React.Component{
    //should change this to state
    //only working cus of rerender in overall state
    displayLoading;
    
   tryLogin = (event) =>{
        event.persist();
        console.log(event);
        const email = event.target[0].value;
        const pass = event.target[1].value;
        event.preventDefault();
        this.props.dispatch(login(email,pass))

        .then(user => {
            console.log('current user after login', user);
        })

        .catch(err => {
            console.log('error logging in', this.props.error);
        })
        
    }
    render(){
        this.displayLoading = this.props.loading ? true : false;
        console.log(this.props.loading);
        return(
            <div className="login-container center-container">
                <form className="login-form" onSubmit={(e) => this.tryLogin(e)}>
                    <Typography variant='h4' className="form-title">{this.props.title}</Typography>
                    <div className="input-container">
                        <TextField required id="user" label="Email" variant="outlined" helperText={this.props.error ? 'Error Loging in' : ''}/>
                    </div>
                    <div className="input-container">
                        <TextField required id="password" label="Password" variant="outlined" type="password" helperText={this.props.error ? 'Error Loging in' : ''}/>
                    </div>
                    <div className="input-container">
                        <CircularProgress className={this.displayLoading ? '' : 'hidden'} />
                        <Button className={this.displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Login</Button>
                    </div>
                {console.log('render user: ',this.props.currentUser,this.props.error)}
                </form>
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    loading:state.auth.loading
});
export default connect(mapStateToProps)(LoginForm);