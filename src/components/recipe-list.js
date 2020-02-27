import React from 'react';
import {connect} from 'react-redux';
import {getRecipes} from '../actions/recipeActions';
import requiresLogin from '../HOC/requires-login';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
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
        const placeholderImage = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=387&q=80%20387w';
        for(let i = 0;i < recipes.length;i++){
            let recipe = recipes[i];
            recipeCards.push(
                <GridListTile style={{ height: '100%' }} cols={recipe.featured ? 2 : 1} rows={recipe.featured ? 2 : 1}>
                    <img src={recipe.mainImage ?  recipe.mainImage : placeholderImage} alt={recipe.title}/>
                    <GridListTileBar
                    title={recipe.title}
                    subtitle={<span>{recipe.shortDescription ? recipe.shortDescription : recipe.description.slice(0,100) + '...'}</span>}
                    actionIcon={
                        <Tooltip className="recipe-tooltip" title={'Serving Size: ' + recipe.servingSize + ' and prep time: ' + recipe.tte}>
                            <IconButton aria-label={"Recipe Info: " + recipe.title}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    />
                </GridListTile>
            );
        }

        return recipeCards;
    }

    render(){
        const recipeCards = this.props.recipes ? this.buildRecipeCards(this.props.recipes) : [];
        console.log(this.props.recipes);
        
        return(
            <div className="flex-container">
                <GridList cellHeight={200} spacing={10} className="recipe-list-container">
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