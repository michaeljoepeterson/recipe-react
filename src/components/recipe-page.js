import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import {getSingleRecipe} from '../actions/recipeActions';
import CreateRecipe from './create-recipe';

export class RecipePage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {handle} = this.props.match.params
        this.props.dispatch(getSingleRecipe(handle))
    }

    render(){
        if(!this.props.selectedRecipe){
            return null;
        }
        return(
            <div className="center-container">
                <CreateRecipe/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    error:state.auth.error,
    recipes:state.recipe.recipes,
    selectedRecipe:state.recipe.selectedRecipe
});
export default requiresLogin()(connect(mapStateToProps)(RecipePage));