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
    constructor(props){
        super(props)
        this.demoUser = 'test@email.com';
        this.demoPass = 'test123';
        this.state = {
            email:'',
            pass:'',
            loading:false
        };
    }

    inputChanged = (event,key) => {
        event.persist();
        const value = event.target.value;
        this.setState({
            [key]:value
        });
    }

    demoLogin = () => {
        this.props.dispatch(login(this.demoUser,this.demoPass)) 
    }
    
    tryLogin = (event) =>{
        event.persist();
        event.preventDefault();
        this.props.dispatch(login(this.state.email,this.state.pass))

        .then(user => {
            console.log('current user after login', user);
        })

        .catch(err => {
            console.log('error logging in', this.props.error);
        })
        
    }
    render(){
        this.displayLoading = this.props.loading ? true : false;
        const loginButton = this.props.testMode ? (
            <Button className={this.displayLoading ? 'hidden' : ''} variant="contained" color="primary" onClick={(e) => this.demoLogin()}>Demo Login</Button>
        ) : (
        <Button className={this.displayLoading ? 'hidden' : ''} variant="contained" color="primary" type="submit">Login</Button>
        );

        const userContainer = !this.props.testMode ? (
            <div className="input-container">
                <TextField required id="user" label="Email" variant="outlined" helperText={this.props.error ? 'Error Loging in' : ''} onChange={(e) => this.inputChanged(e,'email')}/>
            </div>
        ) : null;

        const passContainer = !this.props.testMode ? (
            <div className="input-container">
                <TextField required id="password" label="Password" variant="outlined" type="password" helperText={this.props.error ? 'Error Loging in' : ''} onChange={(e) => this.inputChanged(e,'pass')}/>
            </div>
            ) : null;
        return(
            <div className="login-container center-container">
                <form className="login-form" onSubmit={(e) => this.tryLogin(e)}>
                    <Typography variant='h4' className="form-title">{this.props.title}</Typography>
                    {userContainer}
                    {passContainer}
                    <div className="input-container">
                        <CircularProgress className={this.displayLoading ? '' : 'hidden'} />
                        {loginButton}
                    </div>
                </form>
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    loading:state.auth.loading,
    testMode:state.auth.testMode
});
export default connect(mapStateToProps)(LoginForm);