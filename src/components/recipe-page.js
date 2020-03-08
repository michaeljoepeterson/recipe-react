import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import {getSingleRecipe} from '../actions/recipeActions';

export class RecipePage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {handle} = this.props.match.params
        this.props.dispatch(getSingleRecipe(handle));
    }

    render(){
        console.log(this.props.recipes);
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
    recipes:state.recipe.recipes
});
export default requiresLogin()(connect(mapStateToProps)(RecipePage));