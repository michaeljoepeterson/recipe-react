import React from 'react';
import './App.css';
import LandingPage from './components/landing-page';
import CreateAdmin from './components/create-admin';
import CreateRecipe from './components/create-recipe';
import RecipeList from './components/recipe-list';
import RecipePage from './components/recipe-page';
import {Route, withRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import {theme} from './theme';
import Navbar from './components/navbar';

//navbar have a prop that toggles display for when logged in
//then map state to props
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/create-recipe" render={(props) => (
          <CreateRecipe key={props.match.params.pageid} {...props} />)
        } />
        <Route exact path="/create-admin" component={CreateAdmin} />
        <Route exact path="/recipes" component={RecipeList} />
        <Route exact path="/recipes/:handle" render={(props) => (
          <RecipePage key={props.match.params.pageid} {...props} />)
        } />
        <Route exact path="/test"  render={(props) => (
            <LandingPage />)
          }/>
      </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
