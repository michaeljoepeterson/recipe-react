import React from 'react';
import {connect} from 'react-redux';
import {getRecipes} from '../actions/recipeActions';
import requiresLogin from '../HOC/requires-login';
import GridList from '@material-ui/core/GridList';
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

    render(){

        return(
            <div>
                <p>test</p>
                <GridList cellHeight={200} spacing={1} className>
                    
                </GridList>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes
});
export default requiresLogin()(connect(mapStateToProps)(RecipeList));