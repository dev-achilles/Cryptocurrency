export interface UserState {
  name: any;
  isLoggedIn: boolean;
  role: any;
  error: boolean;
}

export enum UserEnum {
  GET_USER = 'GET_USER',
  SET_ERROR = 'SET_ERROR',
  EXIT_USER = 'EXIT_USER',
}

export interface getUserAction {
  type: UserEnum.GET_USER;
}

export interface setErrorAction {
  type: UserEnum.SET_ERROR;
  payload: boolean;
}

export interface logoutUserAction {
  type: UserEnum.EXIT_USER;
  payload: UserState;
}

export type UserAction = getUserAction | setErrorAction | logoutUserAction;
