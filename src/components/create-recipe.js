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
import {createRecipe,updateRecipe} from '../actions/recipeActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withRouter} from 'react-router-dom';

export class CreateRecipe extends React.Component{
    constructor(props) {
        super(props);
        this.createPath = 'create-recipe';
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
            videoNotes:'',
            active:false,
            saved:false,
            shortDescription:'',
            savedMessage:'Saved',
            featured:false
        };
    }
    componentDidMount() {
        
        console.log('=================props',this.props);
        console.log('=================props',this.props.location.pathname);
        if(this.props.selectedRecipe && !this.props.location.pathname.includes(this.createPath)){
            let {selectedRecipe} = this.props;
  
            this.setState({
                step:selectedRecipe.steps.length,
                ingredient:selectedRecipe.ingredients.length,
                title:selectedRecipe.title ? selectedRecipe.title : "",
                serving:selectedRecipe.servingSize ? selectedRecipe.servingSize : "",
                description:selectedRecipe.description ? selectedRecipe.description : "",
                ingredients:selectedRecipe.ingredients,
                mainImage:selectedRecipe.mainImage ? selectedRecipe.mainImage : "",
                extraImages:selectedRecipe.extraImages ? selectedRecipe.extraImages : "",
                youtube:selectedRecipe.youtube ? selectedRecipe.youtube : "",
                videoNotes:selectedRecipe.videoNotes ? selectedRecipe.videoNotes : "",
                shortDescription:selectedRecipe.shortDescription ? selectedRecipe.shortDescription : "",
                featured:selectedRecipe.featured,
                active:selectedRecipe.active,
                steps:selectedRecipe.steps,
                tte:selectedRecipe.tte
            });
        }
    }
    //update simple input states
    titleChanged = (event,key) => {
        if(event.target){
            event.persist();
        }
        const value = event.target ? event.target.value : event;
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
                        <Select onChange={(e) => this.stepChanged(e,'ingredients',currentIngredient.id,'units')} id="units" value={currentIngredient.units}>
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
            videoNotes:this.state.videoNotes,
            active:this.state.active,
            shortDescription:this.state.shortDescription,
            featured:this.state.featured
        });
        console.log(recipe);

        if(this.props.selectedRecipe && !this.props.location.pathname.includes(this.createPath)){
            this.props.dispatch(updateRecipe(recipe,this.props.selectedRecipe.handle))

            .then(resp=>{
                console.log(resp);
                let {code} = resp;
                if(code === 200){
                    this.setState({
                        saved:true,
                        savedMessage:this.props.recipeMessage
                    });
                }
                else if(code === 401){
                    this.setState({
                        saved:true,
                        savedMessage:'Recipe already exists! Hamburgers'
                    });
                }
                else{
                    this.setState({
                        saved:true,
                        savedMessage:'Recipe not saved :\'(, something blew up'
                    });
                }
            })

            .catch(err => {
                console.log(err);
            });
        }
        else{
            this.props.dispatch(createRecipe(recipe))

            .then(resp=>{
                console.log(resp);
                let {code} = resp;
                if(code === 200){
                    this.setState({
                        saved:true,
                        savedMessage:'Recipe Saved!'
                    });
                }
                else if(code === 401){
                    this.setState({
                        saved:true,
                        savedMessage:'Recipe already exists! Hamburgers'
                    });
                }
                else{
                    this.setState({
                        saved:true,
                        savedMessage:'Recipe not saved :\'(, something blew up'
                    });
                }
            })

            .catch(err => {
                console.log(err);
            });
        }

        
    }

    snackbarClosed = (name) => {
        this.setState({
            [name]:false
        });
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
                            <TextField onChange={(e) => this.titleChanged(e,'title')} required fullWidth required id="title" label="Title" variant="outlined" value={this.state.title}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'serving')} required id="serving" label="Serving Size" variant="outlined" value={this.state.serving}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'tte')} required id="tte" label="TTE (Time to eat)" variant="outlined" value={this.state.tte}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'description')} fullWidth multiline required id="description" label="Description" variant="outlined" value={this.state.description}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'shortDescription')} fullWidth multiline id="shortDescription" label="Short Description" variant="outlined" value={this.state.shortDescription}/>
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
                            <TextField onChange={(e) => this.titleChanged(e,'mainImage')} fullWidth multiline id="main-image" label="Main Image" variant="outlined" value={this.state.mainImage}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField onChange={(e) => this.titleChanged(e,'extraImages')} fullWidth multiline id="extra-images" label="Extra Images (comma seperated)" variant="outlined" value={this.state.extraImages}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'youtube')} fullWidth multiline id="youtube-link" label="Youtube link" variant="outlined" value={this.state.youtube}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'videoNotes')} fullWidth multiline id="video-notes" label="Video Notes" variant="outlined" value={this.state.videoNotes}/>
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={this.state.active}
                                onChange={(e) => this.titleChanged(e.target.checked,'active')}
                                color="primary"
                            />
                            }
                            label="Active"
                        />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12} md={6}> 
                        <FormControlLabel
                            control={
                            <Switch
                                checked={this.state.featured}
                                onChange={(e) => this.titleChanged(e.target.checked,'featured')}
                                color="primary"
                            />
                            }
                            label="Featured"
                        />
                        </Grid>
                    </Grid>
                    <Grid className="input-container-recipe" item xs={12}>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </form>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={this.state.saved}
                    autoHideDuration={6000}
                    onClose={(e) => this.snackbarClosed('saved')}
                    message={this.state.savedMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => this.snackbarClosed('saved')}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.currentUser,
    selectedRecipe:state.recipe.selectedRecipe,
    recipeMessage:state.recipe.message
});
export default requiresLogin()(withRouter(connect(mapStateToProps)(CreateRecipe)));