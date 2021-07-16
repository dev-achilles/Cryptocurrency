import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import s from './Navigation.module.scss';

const Navigation = () => (
  <div className={s.wrapper}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          <Link to="/">Home</Link>
        </Typography>
        <Typography variant="h6" color="inherit">
          <Link to="/table">Table</Link>
        </Typography>
        <Typography variant="h6" color="inherit">
          <Link to="/favourite">Favourite</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Navigation;
