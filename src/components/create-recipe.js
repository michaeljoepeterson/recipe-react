//react class since state will keep track of current recipe
import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import './styles/containers.css';
import './styles/forms.css';
import { MenuItem } from '@material-ui/core';

export class CreateRecipe extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            step:1,
            ingredient:1,
            currentRecipe:{
                title:'',
                serving:'',
                description:'',
                steps:[

                ],
                ingredients:[

                ],
                mainImage:'',
                extraImages:'',
                youtube:''
            }
        };
    }
    //update simple input states
    titleChanged = (event,key) => {
        event.persist();
        const value = event.target.value;
        let newRecipe = this.state.currentRecipe;
        newRecipe[key] = value;
        this.setState({
            currentRecipe:newRecipe
        });
    }

    //render step inputs based on step in state, to avoid js way of adding step
    //also could do that for units so units could be added/removed
    render(){
        console.log(this.state);
        return(
            <div className="content-container">
                <form>
                    <Grid container>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'title')} required fullWidth required id="title" label="Title" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'serving')} required id="serving" label="Serving Size" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe" item xs={12}>
                            <TextField onChange={(e) => this.titleChanged(e,'description')} fullWidth multiline required id="description" label="Description" variant="outlined" />
                        </Grid>
                        <Grid className="input-container-recipe"  alignItems='flex-end' item container spacing={2} xs={12} md={6}>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth multiline required id="ingredient" label={"Ingredient " + this.state.ingredient} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth multiline required id="amount" label={"Amount " + this.state.ingredient} variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputLabel id="units">Units</InputLabel>
                                <Select id="units" value={"cups"}>
                                    <MenuItem value={"cups"}>Cups</MenuItem>
                                    <MenuItem value={"tbs"}>Tbs</MenuItem>
                                    <MenuItem value={"ml"}>ml</MenuItem>
                                    <MenuItem value={"litres"}>Litres</MenuItem>
                                    <MenuItem value={"grams"}>grams</MenuItem>
                                    <MenuItem value={"pieces"}>Pieces</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Button className="input-spacing" variant="contained" color="primary">Add Ingredient</Button>
                            </Grid>
                        </Grid> 
                        <Grid className="input-container-recipe" item xs={12} md={6}>
                            <TextField fullWidth multiline required id="steps" label={"Step " + this.state.step} variant="outlined" />
                            <Button className="input-spacing" variant="contained" color="primary">Add Step</Button>
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