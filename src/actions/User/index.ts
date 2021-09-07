import { UserEnum, setErrorAction, getUserAction, logoutUserAction } from './types';

export const UserActionCreator = {
  getUser: (): getUserAction => ({ type: UserEnum.GET_USER }),
  setError: (error: boolean): setErrorAction => ({ type: UserEnum.SET_ERROR, payload: error }),
  logoutUser: (): logoutUserAction => ({
    type: UserEnum.EXIT_USER,
    payload: { name: null, isLoggedIn: false, role: null, error: false },
  }),
};
