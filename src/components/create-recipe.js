//react class since state will keep track of current recipe
import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../HOC/requires-login';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './styles/containers.css';
import './styles/forms.css';

export class CreateRecipe extends React.Component{


    render(){
        return(
            <div className="content-container">
                <form>
                    <Grid className="input-container-recipe" item xs={12}>
                        <TextField fullWidth required id="title" label="Title" variant="outlined" />
                    </Grid>
                    <Grid className="input-container-recipe" item xs={12}>
                        <TextField className='textfield-input' fullWidth required id="description" label="Description" variant="outlined" />
                    </Grid>
                    <Grid className="input-container-recipe" item xs={12}>
                        <TextField required id="serving" label="Serving Size" variant="outlined" />
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