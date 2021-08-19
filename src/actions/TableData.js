import axios from 'axios';
import { GET_TABLE_DATA, GET_METRICS_DATA, SET_CHECKED_DATA } from '../constants';

export const getTableData = () => async (dispatch) => {
  try {
    const responce = await axios.get(
      'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
    );
    dispatch(setData(responce.data));
  } catch (e) {
    console.log(e);
  }
};

const setData = (res) => {
  return {
    type: GET_TABLE_DATA,
    payload: res.data,
  };
};

export const getMetricsData = (slug) => async (dispatch) => {
  try {
    const responce = await axios.get(`https://data.messari.io/api/v1/assets/${slug}/metrics`);
    dispatch(setMetricsData(responce.data));
  } catch (e) {
    console.log(e);
  }
};

const setMetricsData = (res) => {
  return {
    type: GET_METRICS_DATA,
    payload: res.data,
  };
};

export const setCheckedData = (id, value) => {
  return {
    type: SET_CHECKED_DATA,
    payload: { id, value },
  };
};
