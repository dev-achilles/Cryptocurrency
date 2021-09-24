import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UserActionCreator } from '../../actions/User/index';
import CSS from 'csstype';

import { LoginDataType, Props } from '../../types/LoginTypes';

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

  const loginHandle = (email: string, password: string) => {
    props.dispatch(UserActionCreator.loginUser(email, password));
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

  const redirectToHome = () => {
    setTimeout(() => history.push('/'), 4000);
    return <div className={s.redirect}>Redirect to home...</div>;
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
        <div className={s.register_container}>
          <NavLink to="/register">Create an account</NavLink>
        </div>
        {props.user.error && (
          <div className={s.error_Alert}>
            <Alert severity="error">
              <AlertTitle>
                <strong>You typed incorrect values</strong>
              </AlertTitle>
            </Alert>
          </div>
        )}
        {props.user.token && redirectToHome()}
      </div>
    </div>
  );
};

export default Login;
