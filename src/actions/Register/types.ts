export interface RegisterState {
  message: string;
  error: boolean;
  success: boolean;
}

export enum RegisterEnum {
  REGISTER_USER = 'REGISTER_USER',
  SET_ERROR = 'SET_ERROR',
  SUCCESS_REGISTER = 'SUCCESS_REGISTER',
}

export interface registerUserAction {
  type: RegisterEnum.REGISTER_USER;
  payload: any;
}

export interface registerSetError {
  type: RegisterEnum.SET_ERROR;
  payload: boolean;
}

export interface successRegister {
  type: RegisterEnum.SUCCESS_REGISTER;
  payload: boolean;
}

export interface Request {
  message: string;
}

export type User = {
  name: string;
  email: string;
  password: string | number;
};

export type RegisterAction = registerUserAction | registerSetError | successRegister;
