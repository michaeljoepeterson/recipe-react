import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

export default function RecipeCard(props){
    const placeholderImage = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=387&q=80%20387w';
    console.log(props);
    return(
        <GridListTile style={{ height: '100%' }} cols={props.recipe.featured ? 2 : 1} rows={props.recipe.featured ? 2 : 1}>
            <img src={props.recipe.mainImage ?  props.recipe.mainImage : placeholderImage} alt={props.recipe.title}/>
            <GridListTileBar
              title={props.recipe.title}
              subtitle={<span>{props.recipe.shortDescription ? props.recipe.shortDescription : props.recipe.description.slice(0,100) + '...'}</span>}
              actionIcon={
                <Tooltip title={'Serving Size: ' + props.recipe.servingSize + ' and prep time: ' + props.recipe.tte}>
                    <IconButton aria-label={"Recipe Info: " + props.recipe.title}>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
              }
            />
        </GridListTile>
    )
}

