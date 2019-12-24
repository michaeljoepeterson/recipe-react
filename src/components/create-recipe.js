//react class since state will keep track of current recipe
import React from 'react';
import {connect} from 'react-redux';

export class CreateRecipe extends React.Component{

    render(){
        return(
            <h1>logged in!</h1>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});
export default connect(mapStateToProps)(CreateRecipe);