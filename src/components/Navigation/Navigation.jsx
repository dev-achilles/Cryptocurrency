import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import TableChartIcon from '@material-ui/icons/TableChart';
import { makeStyles } from '@material-ui/core/styles';
import { getUser, exitUser } from '../../actions/User';

import logo from '../../assets/images/logo.jpg';
import s from './Navigation.module.scss';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    paddingRight: '20px',
    paddingLeft: '10px',
  },
  menuIcon: {
    color: 'white',
  },
  list: {
    width: 150,
  },
  button: {
    color: 'white',
    borderColor: '#00000042',
    backgroundColor: '#ffffff17',
    '&:hover': {
      border: '1px solid white',
    },
  },
  exitIcon: {
    color: 'white',
  },
}));

const Navigation = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.dispatch(getUser());
  }, []);

  const exitHandle = () => {
    const userData = {
      name: null,
      isLoggedIn: false,
      role: null,
      error: false,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    props.dispatch(exitUser({ name: null, isLoggedIn: false, role: null, error: false }));
  };

  return (
    <div className={s.wrapper}>
      <AppBar className={classes.root} position="relative">
        <div className={s.container}>
          <div className={s.logo}>
            <img src={logo}></img>
          </div>
          <div className={s.links_container}>
            <div className={s.links}>
              <Typography variant="h6" color="inherit">
                <Link className={s.home_link} to="/">
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" color="inherit">
                <Link className={s.table_link} to="/table">
                  Table
                </Link>
              </Typography>
              <Typography variant="h6" color="inherit">
                <Link className={s.favourite_link} to="/favourite">
                  Favourite
                </Link>
              </Typography>
              {props.user.isLoggedIn ? (
                <Typography variant="h6" color="inherit">
                  <div className={s.user_container}>
                    <div className={s.user_name}>{props.user.name}</div>
                    <div>
                      <IconButton className={classes.exitIcon} onClick={exitHandle}>
                        <ExitToAppIcon />
                      </IconButton>
                    </div>
                  </div>
                </Typography>
              ) : (
                <Typography variant="h6" color="inherit">
                  <Link className={s.login_link} to="/login">
                    <Button className={classes.button} variant="outlined" color="primary">
                      Login
                    </Button>
                  </Link>
                </Typography>
              )}
            </div>
            <div className={s.burger}>
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <div
                  className={clsx(classes.list)}
                  role="presentation"
                  onClick={() => setOpen(false)}
                  onKeyDown={() => setOpen(false)}>
                  <List>
                    {props.user.isLoggedIn ? (
                      <ListItem button key="Home">
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={props.user.name} />
                      </ListItem>
                    ) : (
                      <ListItem button key="Login">
                        <Link className={s.burger_link} to="/login">
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </Link>
                      </ListItem>
                    )}
                    <ListItem button key="Home">
                      <Link className={s.burger_link} to="/">
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </Link>
                    </ListItem>
                    <ListItem button key="Table">
                      <Link className={s.burger_link} to="/table">
                        <ListItemIcon>
                          <TableChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Table" />
                      </Link>
                    </ListItem>
                    <ListItem button key="Favourite">
                      <Link className={s.burger_link} to="/favourite">
                        <ListItemIcon>
                          <LocalActivityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favourite" />
                      </Link>
                    </ListItem>
                    {props.user.isLoggedIn && (
                      <ListItem button key="Exit" onClick={exitHandle}>
                        <ListItemIcon>
                          <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Exit" />
                      </ListItem>
                    )}
                  </List>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Navigation;
