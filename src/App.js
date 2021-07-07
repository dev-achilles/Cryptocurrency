import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent/index';
import TableContainer from './containers/TableContainer';
import NavigationComponent from './components/NavigationComponent/index';
import FavouriteComponent from './components/FavouriteComponent/index';
import NotFoundComponent from './components/NotFoundComponent/index';

const App = () => (
  <div className="wrapper">
    <Router>
      <Switch>
        <Route exact path="/">
          <NavigationComponent />
          <HomeComponent />
        </Route>
        <Route path="/table">
          <NavigationComponent />
          <TableContainer />
        </Route>
        <Route path="/favourite">
          <NavigationComponent />
          <FavouriteComponent />
        </Route>
        <Route path="*">
          <NotFoundComponent />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
