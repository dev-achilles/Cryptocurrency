import { GET_HOME_DATA, SET_HOME_DATA, GET_INFO_DATA } from '../constants';

export const getHomeData = (data) => {
  return {
    type: GET_HOME_DATA,
    payload: data,
  };
};

export const setHomeData = (data) => {
  return {
    type: SET_HOME_DATA,
    payload: data,
  };
};

export const getInfoData = (info, data) => {
  return {
    type: GET_INFO_DATA,
    payload: { info, data },
  };
};
