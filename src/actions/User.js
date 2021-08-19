import { SET_ERROR, GET_USER, EXIT_USER } from '../constants';

export const getUser = () => {
  return {
    type: GET_USER,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const logoutUser = (data) => {
  return {
    type: EXIT_USER,
    payload: data,
  };
};
