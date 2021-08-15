import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const Login = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { value, name } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const loginHandle = (email, password) => {
    console.log(email);
    console.log(password);
  };

  return (
    <div className={s.wrapper}>
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
              onClick={() => setData({ ...data, email: '', password: '' })}>
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
