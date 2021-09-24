export interface UserState {
  token: string | null;
  name: any;
  isLoggedIn: boolean;
  role: any;
  error: boolean;
}

export enum UserEnum {
  GET_USER = 'GET_USER',
  SET_ERROR = 'SET_ERROR',
  EXIT_USER = 'EXIT_USER',
  LOGIN_USER = 'LOGIN_USER',
  SET_USER = 'SET_USER',
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

export interface loginUserAction {
  type: UserEnum.LOGIN_USER;
  payload: any;
}

export interface setUserDataAction {
  type: UserEnum.SET_USER;
  payload: any;
}

export interface Request {
  data: {
    token: string;
  };
}

export type UserAction =
  | getUserAction
  | setErrorAction
  | logoutUserAction
  | loginUserAction
  | setUserDataAction;
