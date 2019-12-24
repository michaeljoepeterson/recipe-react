import React from 'react';
import './App.css';
import LandingPage from './components/landing-page';
import CreateRecipe from './components/create-recipe';
import {Route, withRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import {theme} from './theme';
//navbar have a prop that toggles display for when logged in
//then map state to props
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/create-recipe" component={CreateRecipe} />
      </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
