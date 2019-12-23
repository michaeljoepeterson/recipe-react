import React from 'react';
import './App.css';
import LandingPage from './components/landing-page';
import {Route, withRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import {theme} from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
      </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
