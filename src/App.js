import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/index';
import TableContainer from './containers/TableContainer';
import Navigation from './components/Navigation/index';
import NotFound from './components/NotFound/index';

const App = () => (
  <div className="wrapper">
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <Home />
        </Route>
        <Route path="/table">
          <Navigation />
          <TableContainer />
        </Route>
        <Route path="/favourite">
          <Navigation />
          <TableContainer favourite={true} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
