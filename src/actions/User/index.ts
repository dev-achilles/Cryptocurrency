import { Dispatch } from 'redux';
import axios from 'axios';
import {
  UserEnum,
  setErrorAction,
  getUserAction,
  logoutUserAction,
  loginUserAction,
  setUserDataAction,
  Request,
} from './types';

export const UserActionCreator = {
  getUser: (): getUserAction => ({ type: UserEnum.GET_USER }),
  setUserToken: (res: Request): loginUserAction => ({
    type: UserEnum.LOGIN_USER,
    payload: res.data.token,
  }),
  setUserData: (res: string): setUserDataAction => ({ type: UserEnum.SET_USER, payload: res }),
  loginUser: (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      const responce = await axios.post(
        `http://hofenterprise.com/users/login/app?email=${email}&password=${password}`,
      );
      dispatch(UserActionCreator.setUserToken(responce));
      dispatch(UserActionCreator.setError(false));
    } catch (e) {
      dispatch(UserActionCreator.setError(true));
    }
  },
  getUserData: (token: string) => async (dispatch: Dispatch<any>) => {
    try {
      const config = {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      const responce = await axios.get('http://hofenterprise.com/user', config);
      dispatch(UserActionCreator.setUserData(responce.data));
    } catch (e) {
      console.log(e);
    }
  },
  setError: (error: boolean): setErrorAction => ({ type: UserEnum.SET_ERROR, payload: error }),
  logoutUser: (): logoutUserAction => ({
    type: UserEnum.EXIT_USER,
    payload: { token: null, name: null, isLoggedIn: false, role: null, error: false },
  }),
};
