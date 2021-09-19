import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RegisterActionCreator } from '../../actions/Register/index';

import { Data } from '../../types/RegisterTypes';

import CSS from 'csstype';

import s from './Register.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
      marginBottom: '20px',
    },
  },
}));

const Register: React.FC = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    password: '',
    password_2: '',
  });

  useEffect(() => {
    return () => {
      props.dispatch(RegisterActionCreator.setError(false));
      props.dispatch(RegisterActionCreator.setSuccess(false));
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const registerHandle = (data: Data) => {
    const { name, email, password, password_2 } = data;
    if (password === password_2) {
      const user = {
        name,
        email,
        password,
      };
      props.dispatch(RegisterActionCreator.setRegisterUser(user));
    } else {
      props.dispatch(RegisterActionCreator.setError(true));
    }
  };

  const resetData = () => {
    setData({ name: '', email: '', password: '', password_2: '' });
    props.dispatch(RegisterActionCreator.setError(false));
  };

  const containerStyle: CSS.Properties = {
    flexDirection: 'column',
  };

  const backToLogin = () => {
    setTimeout(() => history.push('/login'), 5000);
    return <div className={s.redirect_login}>Redirecting to login...</div>;
  };

  return (
    <div className={s.wrapper}>
      <div className="container" style={containerStyle}>
        <div className={s.title}>Register</div>
        <div className={s.login_container}>
          <form className={classes.root} noValidate>
            <div className={s.email}>
              <TextField
                id="standard-password-input"
                label="Name"
                name="name"
                type="text"
                value={data.name}
                autoComplete="current-email"
                onChange={handleInputChange}
                error={props.register.error}
                helperText={props.register.error ? 'Incorrect name' : null}
              />
            </div>
            <div className={s.email}>
              <TextField
                id="standard-password-input"
                label="Email"
                name="email"
                type="email"
                value={data.email}
                autoComplete="current-email"
                onChange={handleInputChange}
                error={props.register.error}
                helperText={props.register.error ? 'Incorrect email' : null}
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
                error={props.register.error}
                helperText={props.register.error ? 'Incorrect password' : null}
              />
            </div>
            <div className={s.password}>
              <TextField
                id="standard-password-input"
                label="Repeat password"
                name="password_2"
                value={data.password_2}
                type="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                error={props.register.error}
                helperText={props.register.error ? 'Incorrect password' : null}
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
              onClick={() => registerHandle(data)}>
              Register
            </Button>
          </div>
        </div>
        {props.register.error && (
          <div className={s.error_Alert}>
            <Alert severity="error">
              <AlertTitle>
                <strong>
                  {props.register.message === '' ? 'Passwords incorrect' : props.register.message}
                </strong>
              </AlertTitle>
            </Alert>
          </div>
        )}
        {props.register.success && (
          <div className={s.success_Alert}>
            <Alert severity="success">
              <AlertTitle>
                <strong>{props.register.message}</strong>
              </AlertTitle>
            </Alert>
          </div>
        )}
        {props.register.success && backToLogin()}
      </div>
    </div>
  );
};

export default Register;
