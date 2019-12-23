import React from 'react';
import './App.css';
import LandingPage from './components/landing-page';
import {Route, withRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
    </div>
  );
}

export default withRouter(App);
