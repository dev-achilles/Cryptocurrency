import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import TableChartIcon from '@material-ui/icons/TableChart';
import { makeStyles } from '@material-ui/core/styles';
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
}));

const Navigation = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

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
