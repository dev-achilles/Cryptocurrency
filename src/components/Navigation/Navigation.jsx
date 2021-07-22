import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/images/logo.jpg';
import s from './Navigation.module.scss';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    paddingRight: '20px',
    paddingLeft: '10px',
  },
}));

const Navigation = () => {
  const classes = useStyles();

  return (
    <div className={s.wrapper}>
      <AppBar className={classes.root} position="relative">
        <div className={s.container}>
          <div className={s.logo}>
            <img src={logo}></img>
          </div>
          <div className={s.links}>
            <Typography variant="h6" color="inherit">
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" color="inherit">
              <Link to="/table">Table</Link>
            </Typography>
            <Typography variant="h6" color="inherit">
              <Link to="/favourite">Favourite</Link>
            </Typography>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Navigation;
