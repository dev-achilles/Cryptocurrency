import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UserActionCreator } from '../../actions/User/index';
import CSS from 'csstype';

import { Props, LoginDataType, UserType } from '../../types/LoginTypes';
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

const Login: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState<LoginDataType>({
    email: '',
    password: '',
  });

  useEffect(() => {
    return () => {
      props.dispatch(UserActionCreator.setError(false));
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const loginHandle = (email: string, password: string | number) => {
    const user = db.users.find((user: UserType) => user.email === email);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      loginHandle(data.email, data.password);
    }
  };

  const containerStyle: CSS.Properties = {
    flexDirection: 'column',
  };

  return (
    <div className={s.wrapper} onKeyDown={handleKeyDown}>
      <div className="container" style={containerStyle}>
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
