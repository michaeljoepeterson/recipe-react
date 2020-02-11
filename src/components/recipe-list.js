import React from 'react';
import {connect} from 'react-redux';
import {getRecipes} from '../actions/recipeActions';
import requiresLogin from '../HOC/requires-login';

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
                <p>{this.props.match.params.skip}</p>
                <p>{this.props.match.params.limit}</p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes
});
export default requiresLogin()(connect(mapStateToProps)(RecipeList));