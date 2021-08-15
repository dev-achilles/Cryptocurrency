import { LOGIN_USER, RESET_ERROR } from '../constants';

export const loginUser = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

export const resetError = (error) => {
  return {
    type: RESET_ERROR,
    payload: error,
  };
};
