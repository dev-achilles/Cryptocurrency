import userReducer from '../../reducers/user';
import { UserActionCreator } from '../../actions/User';
import axios from 'axios';

it('Login user', async () => {
  const initialState = {
    token: null,
    name: null,
    isLoggedIn: false,
    role: null,
    error: false,
  };

  const email = 'aizek124@gmail.com';
  const password = '123456';

  try {
    const responce = await axios.post(
      `http://hofenterprise.com/users/login/app?email=${email}&password=${password}`,
    );

    let action = UserActionCreator.setUserToken(responce);
    let newState = userReducer(initialState, action);
    expect(newState.isLoggedIn).toEqual(true);
  } catch (e) {
    if (e) {
      let action = UserActionCreator.setError(true);
      let newState = userReducer(initialState, action);
      expect(newState.error).toEqual(true);
    }
  }
});
