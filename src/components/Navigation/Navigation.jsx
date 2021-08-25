import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
import Avatar from '@material-ui/core/Avatar';
import TableChartIcon from '@material-ui/icons/TableChart';
import { makeStyles } from '@material-ui/core/styles';
import { getUser, logoutUser } from '../../actions/User';

import logo from '../../assets/images/logo.png';
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
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState();

  useEffect(() => {
    props.dispatch(getUser());
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const logoutHandle = () => {
    const userData = {
      name: null,
      isLoggedIn: false,
      role: null,
      error: false,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    props.dispatch(logoutUser({ name: null, isLoggedIn: false, role: null, error: false }));
  };

  return (
    <div className={s.wrapper}>
      <AppBar className={classes.root} position="relative">
        <div className={s.container}>
          <div className={s.logo}>
            <NavLink to="/">
              <img src={logo}></img>
            </NavLink>
          </div>
          <div className={s.links_container}>
            <div className={s.links}>
              <Typography variant="h6" color="inherit">
                <NavLink className={activeLink === '/' ? s.active_home_link : s.home_link} to="/">
                  Home
                </NavLink>
              </Typography>
              <Typography variant="h6" color="inherit">
                <NavLink
                  className={activeLink === '/table' ? s.active_table_link : s.table_link}
                  to="/table">
                  Table
                </NavLink>
              </Typography>
              <Typography variant="h6" color="inherit">
                <NavLink
                  className={
                    activeLink === '/favourite' ? s.active_favourite_link : s.favourite_link
                  }
                  to="/favourite">
                  Favourite
                </NavLink>
              </Typography>
              {props.user.isLoggedIn ? (
                <Typography variant="h6" color="inherit">
                  <div className={s.user_container}>
                    <div className={s.user_name}>{props.user.name}</div>
                    <div>
                      <IconButton className={classes.exitIcon} onClick={logoutHandle}>
                        <ExitToAppIcon />
                      </IconButton>
                    </div>
                  </div>
                </Typography>
              ) : (
                <Typography variant="h6" color="inherit">
                  <NavLink className={s.login_link} to="/login">
                    <Button className={classes.button} variant="outlined" color="primary">
                      Login
                    </Button>
                  </NavLink>
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
                      <ListItem button key="Avatar">
                        <ListItemIcon>
                          <Avatar style={{ backgroundColor: '#3f51b5' }}>
                            {props.user.name.substr(0, 1).toUpperCase()}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={props.user.name} />
                      </ListItem>
                    ) : (
                      <ListItem button key="Login">
                        <NavLink className={s.burger_link} to="/login">
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </NavLink>
                      </ListItem>
                    )}
                    <ListItem button key="Home">
                      <NavLink className={s.burger_link} to="/">
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </NavLink>
                    </ListItem>
                    <ListItem button key="Table">
                      <NavLink className={s.burger_link} to="/table">
                        <ListItemIcon>
                          <TableChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Table" />
                      </NavLink>
                    </ListItem>
                    <ListItem button key="Favourite">
                      <NavLink className={s.burger_link} to="/favourite">
                        <ListItemIcon>
                          <LocalActivityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favourite" />
                      </NavLink>
                    </ListItem>
                    {props.user.isLoggedIn && (
                      <ListItem button key="Exit" onClick={logoutHandle}>
                        <ListItemIcon>
                          <ExitToAppIcon style={{ color: '#009688' }} />
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
