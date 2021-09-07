import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UserActionCreator } from '../../actions/User/index';

import db from '../../db';

import s from './Login.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
      marginBottom: '20px',
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    return () => {
      props.dispatch(UserActionCreator.setError(false));
    };
  }, []);

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const loginHandle = (email, password) => {
    const user = db.users.find((item) => item.email === email);
    if (user) {
      if (user.password === password) {
        const userData = {
          name: user.name,
          isLoggedIn: true,
          role: user.role,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        props.dispatch(UserActionCreator.setError(false));
        history.push('/');
      } else {
        const userData = {
          name: null,
          isLoggedIn: false,
          role: null,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        props.dispatch(UserActionCreator.setError(true));
      }
    } else {
      const userData = {
        name: null,
        isLoggedIn: false,
        role: null,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      props.dispatch(UserActionCreator.setError(true));
    }
  };

  const resetData = () => {
    setData({ email: '', password: '' });
    props.dispatch(UserActionCreator.setError(false));
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      loginHandle(data.email, data.password);
    }
  };

  return (
    <div className={s.wrapper} onKeyDown={handleKeyDown}>
      <div className="container" style={{ 'flex-direction': 'column' }}>
        <div className={s.title}>Login</div>
        <div className={s.login_container}>
          <form className={classes.root} noValidate>
            <div className={s.email}>
              <TextField
                id="standard-password-input"
                label="Email"
                name="email"
                type="email"
                value={data.email}
                autoComplete="current-email"
                width="300px"
                onChange={handleInputChange}
                error={props.user.error}
                helperText={props.user.error ? 'Incorrect login' : null}
              />
            </div>
            <div className={s.password}>
              <TextField
                id="standard-password-input"
                label="Password"
                name="password"
                value={data.password}
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                error={props.user.error}
                helperText={props.user.error ? 'Incorrect password' : null}
              />
            </div>
          </form>
        </div>
        <div className={s.button_container}>
          <div className={s.button}>
            <Button
              variant="contained"
              color="primary"
              className={s.button_login}
              onClick={resetData}>
              Reset
            </Button>
          </div>
          <div className={s.button}>
            <Button
              variant="contained"
              color="primary"
              className={s.button_login}
              onClick={() => loginHandle(data.email, data.password)}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
