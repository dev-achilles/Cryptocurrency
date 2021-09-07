import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TableContainer from './containers/TableContainer';
import MetricsContainer from './containers/MetricsContainer';
import NotFound from './components/NotFound/index';
import LoginContainer from './containers/LoginContainer';
import NavigationContainer from './containers/NavigationContainer';
import HomeContainer from './containers/HomeContainer';
import TokenInfoContainer from './containers/TokenInfoContainer';

const App = () => (
  <div className="wrapper">
    <Router>
      <Switch>
        <Route exact path="/">
          <NavigationContainer />
          <HomeContainer />
        </Route>
        <Route path="/table">
          <NavigationContainer />
          <TableContainer />
        </Route>
        <Route path="/favourite">
          <NavigationContainer />
          <TableContainer favourite={true} />
        </Route>
        <Route path="/login">
          <NavigationContainer />
          <LoginContainer />
        </Route>
        <Route path="/metrics/:slug">
          <NavigationContainer />
          <MetricsContainer />
        </Route>
        <Route path="/info/:info">
          <NavigationContainer />
          <TokenInfoContainer />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
