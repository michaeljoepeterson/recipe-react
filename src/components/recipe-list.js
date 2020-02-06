import React from 'react';
import {connect} from 'react-redux';

export class RecipeList extends React.Component{

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
export default connect(mapStateToProps)(RecipeList);