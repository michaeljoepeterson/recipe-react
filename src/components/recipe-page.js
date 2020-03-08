import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import requiresLogin from '../HOC/requires-login';

export class RecipePage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render(){
        return(
            <div className="center-container">
                <h1>test</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    recipes:state.recipes
});
export default requiresLogin()(connect(mapStateToProps)(RecipePage));