import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React from 'react';

export function LandingPage(props){
    const title = 'Veggie Might';
    if(props.currentUser){
        return <Redirect to='/create-recipe'/>;
    }
    return(
        <GridListTile cols={props.featured ? 2 : 1} rows={props.featured ? 2 : 1}>

        </GridListTile>
    )
}

