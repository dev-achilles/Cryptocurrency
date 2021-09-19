import axios from 'axios';
import {
  RegisterEnum,
  registerUserAction,
  Request,
  User,
  registerSetError,
  successRegister,
} from './types';
import { AppDispatch } from './../../store';

export const RegisterActionCreator = {
  registerUser: (res: Request): registerUserAction => ({
    type: RegisterEnum.REGISTER_USER,
    payload: res.message,
  }),
  setRegisterUser: (user: User) => async (dispatch: AppDispatch) => {
    try {
      const responce = await axios.post('http://hofenterprise.com/users/register/app', user);
      dispatch(RegisterActionCreator.registerUser(responce.data));
      dispatch(RegisterActionCreator.setError(false));
      dispatch(RegisterActionCreator.setSuccess(true));
    } catch (error) {
      dispatch(RegisterActionCreator.setError(true, 'You typed incorrect values'));
      dispatch(RegisterActionCreator.setSuccess(false));
    }
  },
  setError: (error: boolean, message?: string): registerSetError => ({
    type: RegisterEnum.SET_REGISTER_ERROR,
    payload: { error, message },
  }),
  setSuccess: (success: boolean): successRegister => ({
    type: RegisterEnum.SUCCESS_REGISTER,
    payload: success,
  }),
};
