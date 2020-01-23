//react class since state will keep track of current recipe
import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import './styles/containers.css';
import './styles/forms.css';
import { MenuItem } from '@material-ui/core';
import {createRecipe} from '../actions/recipeActions';

export class CreateRecipe extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            step:1,
            ingredient:1,
            title:'',
            serving:'',
            tte:'',
            description:'',
            steps:[
                {
                    stepDescription:'',
                    id:0
                }
            ],
            ingredients:[
                {
                    amount:'',
                    ingredient:'',
                    units:'',
                    id:0
                }
            ],
            mainImage:'',
            extraImages:'',
            youtube:'',
            videoNotes:''
        };
    }
    //update simple input states
    titleChanged = (event,key) => {
        event.persist();
        const value = event.target.value;
        //let newRecipe = this.state.currentRecipe;
        //newRecipe[key] = value;
        this.setState({
            [key]:value
        });
    }
    //step or ingredient changed
    stepChanged = (event,key,id,innerkey) => {
        
        event.persist();
        const value = event.target.value;
        let current = [...this.state[key]];
        for(let i = 0;i < current.length;i++){
            let item = current[i]
            if(item.id === id){
                current[i][innerkey] = value;
                break;
            }
        }
        this.setState({
            [key]:current
        });
        console.log(value,key,this.state);
        
    }

    addIngredient = (event) => {
        const ingredient = this.state.ingredient + 1;
        let ingredients = [...this.state.ingredients];
        let currentId = this.state.ingredients[this.state.ingredients.length - 1].id + 1;

        //currentRecipe.ingredients.push(this.blankIngredient);     
        ingredients.push({
            amount:'',
            ingredient:'',
            units:'',
            id:currentId
        })
        this.setState({
            ingredient,
            ingredients
        });

        console.log(this.state,currentId);
    }
    //do it this way
    addStep = (event) => {
        //const newRecipeData = JSON.parse(JSON.stringify(this.state.currentRecipe));
        
        const step = this.state.step + 1;
        let currentId = this.state.steps[this.state.steps.length - 1].id + 1;
        let steps = [...this.state.steps];
        steps.push({
            stepDescription:'',
            id:currentId
        }); 
        console.log('old data:',steps);
        this.setState({
            step,
            steps
        });

        console.log(this.state,currentId,this.blankStep);
    }
    //remove step/ingredient
    removeStep = (stepId,key) => {
        
        let current = this.state[key];
        //let stateCounter = this.state[counter];
        current = current.filter((item) => {
            return item.id !== stepId
        });

        this.setState({
            [key]:current
        });
        
        console.log('===========',current[key],key,stepId);
    }

    buildIngredients = () => {
        let ingredientComponents = [];

        for(let i = 0;i < this.state.ingredients.length;i++){
            const currentIngredient = this.state.ingredients[i];
            ingredientComponents.push(
                <Grid key={i} xs={12} item container spacing={1}>
                    <Grid container item xs={12} md={4}>
                        <Grid item xs={12} md={2} className="icon-container" aria-label='delete' onClick={(e) => this.removeStep(currentIngredient.id,'ingredients')}>
                            {i > 0 ? <DeleteForeverIcon/> : ''}     
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <TextField onChange={(e) => this.stepChanged(e,'ingredients',currentIngredient.id,'ingredient')} fullWidth multiline required id="ingredient" label={"Ingredient " + (i + 1)} variant="outlined" value={currentIngredient.ingredient}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField onChange={(e) => this.stepChanged(e,'ingredients',currentIngredient.id,'amount')} fullWidth multiline required id="amount" label={"Amount " + (i + 1)} variant="outlined" value={currentIngredient.amount}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InputLabel id="units">Units</InputLabel>
                        <Select onChange={(e) => this.stepChanged(e,'ingredients',currentIngredient.id,'units')} id="units" value={"cups"} value={currentIngredient.units}>
                            <MenuItem value={"cups"}>Cups</MenuItem>
                            <MenuItem value={"tbs"}>Tbs</MenuItem>
                            <MenuItem value={"ml"}>ml</MenuItem>
                            <MenuItem value={"litres"}>Litres</MenuItem>
                            <MenuItem value={"grams"}>grams</MenuItem>
                            <MenuItem value={"pieces"}>Pieces</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            );
        }

        return ingredientComponents;
    }

    buildSteps = () => {
        let stepComponenets = [];

        for(let i = 0;i < this.state.steps.length;i++){
            const currentStep = this.state.steps[i];
            stepComponenets.push(
                <Grid container item xs={12} key={i}>
                    <Grid item xs={12} md={2} className="icon-container" aria-label='delete' onClick={(e) => this.removeStep(currentStep.id,'steps')}>
                        {i > 0 ? <DeleteForeverIcon /> : ''}
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TextField className="step-spacing" fullWidth multiline required id="steps" label={"Step " + (i + 1)} variant="outlined" onChange={(e) => this.stepChanged(e,'steps',currentStep.id,'stepDescription')} value={currentStep.stepDescription}/>
                    </Grid>
                </Grid> 
            );
        }

        return stepComponenets;
    }

    saveRecipe = (event) =>{
        event.persist();
        event.preventDefault();
        const recipe = Object.assign({},{},{
            title:this.state.title,
            servingSize:this.state.serving,
            tte:this.state.tte,
            description:this.state.description,
            steps:this.state.steps,
            ingredients:this.state.ingredients,
            mainImage:this.state.mainImage,
            extraImages:this.state.extraImages,
            youtube:this.state.youtube,
            videoNotes:this.state.videoNotes
        });
        console.log(recipe);
        this.props.dispatch(createRecipe(recipe))
    }

    //render step inputs based on step in state, to avoid js way of adding step
    //also could do that for units so units could be added/removed
    render(){
        console.log('render state: ',this.state);
        const ingredientComponents = this.buildIngredients();
        const stepComponenets = this.buildSteps();
        return(
            <div className="content-container">
                <form onSubmit={(e) => this.saveRecipe(e)}>
                    <Grid container>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'title')} required fullWidth required id="title" label="Title" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'serving')} required id="serving" label="Serving Size" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'tte')} required id="tte" label="TTE (Time to eat)" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'description')} fullWidth multiline required id="description" label="Description" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe"  alignItems='flex-end' item container spacing={2} xs={12} md={6}>
                            {ingredientComponents}
                            <Grid item xs={12}>
                                <Button className="input-spacing" variant="contained" color="primary" onClick={(e) => this.addIngredient(e)}>Add Ingredient</Button>
                            </Grid>
                        </Grid> 
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            {stepComponenets}
                            <Button className="input-spacing" variant="contained" color="primary" onClick={(e) => this.addStep(e)}>Add Step</Button>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'mainImage')} fullWidth multiline id="main-image" label="Main Image" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'extraImages')} fullWidth multiline id="extra-images" label="Extra Images (comma seperated)" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'youtube')} fullWidth multiline id="youtube-link" label="Youtube link" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'videoNotes')} fullWidth multiline id="video-notes" label="Video Notes" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid className="input-container-recipe" item xs={12}>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser
});
export default requiresLogin()(connect(mapStateToProps)(CreateRecipe));