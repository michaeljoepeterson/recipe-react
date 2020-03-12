import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import {getSingleRecipe} from '../actions/recipeActions';
import CreateRecipe from './create-recipe';

export class RecipePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRecipe:null
        };
    }

    componentDidMount() {
        const {handle} = this.props.match.params
        this.props.dispatch(getSingleRecipe(handle))
        
        .then(response => {
            console.log('after getting new single recipe================',this.props.recipes);
        })

        .catch(err => {

        })
    }

    render(){
        console.log(this.props.recipes);
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