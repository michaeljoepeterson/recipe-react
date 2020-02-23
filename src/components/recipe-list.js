import React from 'react';
import {connect} from 'react-redux';
import {getRecipes} from '../actions/recipeActions';
import requiresLogin from '../HOC/requires-login';
import GridList from '@material-ui/core/GridList';
import RecipeCard from './recipe-card';
import './styles/containers.css';

export class RecipeList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            skip:null,
            limit:10
        }
    }

    componentDidMount() {
        const queryObj = this.parseQuery();
        this.props.dispatch(getRecipes(queryObj.skip,queryObj.limit));
    }

    parseQuery = () => {
        let queryObject = {};

        let query = this.props.location.search.replace('?','');
        let params = query.split('&');
        for(let i = 0;i < params.length;i++){
            let keyArr = params[i].split('=');
            queryObject[keyArr[0]] = keyArr[1];
        }

        return queryObject;
    }

    buildRecipeCards = (recipes) => {
        let recipeCards = [];

        for(let i = 0;i < recipes.length;i++){
            let recipe = recipes[i];
            recipeCards.push(
                <RecipeCard recipe={recipe} key={i}/>
            );
        }

        return recipeCards;
    }

    render(){
        const recipeCards = this.props.recipes ? this.buildRecipeCards(this.props.recipes) : [];
        console.log(this.props.recipes);
        console.log(recipeCards);
        return(
            <div className="flex-container">
                <GridList cellHeight={200} spacing={1} className="recipe-list-container">
                    {recipeCards}
                </GridList>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes
});
export default requiresLogin()(connect(mapStateToProps)(RecipeList));