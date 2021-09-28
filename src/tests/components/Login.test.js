import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Login from '../../components/Login/index';
import store from '../../store';

const Props = {
  token: null,
  name: null,
  isLoggedIn: false,
  role: null,
  error: false,
};

describe('Login-form', () => {
  it('has an input value to text field', () => {
    const { getByTestId } = render(
      <Router>
        <Login user={Props} dispatch={store.dispatch} />
      </Router>,
    );

    const password = getByTestId('login-password');
    const email = getByTestId('login-email');
    const submit = getByTestId('login-submit');

    fireEvent.change(email, { target: { value: 'aizek124@gmail.com' } });
    fireEvent.change(password, { target: { value: '123456' } });
    fireEvent.click(submit);
    expect(email.value).toEqual('aizek124@gmail.com');
    expect(password.value).toEqual('123456');
  });
});
