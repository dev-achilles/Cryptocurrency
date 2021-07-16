import { SET_TABLE_DATA, SORT_TABLE } from '../constants';
import axios from 'axios';

export const setTableData = () => {
  return async (dispatch) => {
    try {
      const responce = await axios.get(
        'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
      );
      dispatch(setData(responce.data));
    } catch (e) {
      console.log(e);
    }
  };
};

const setData = (res) => {
  return {
    type: SET_TABLE_DATA,
    payload: {
      ...res.data,
    },
  };
};

export const sortTable = (data) => {
  return {
    type: SORT_TABLE,
    payload: {
      ...data,
    },
  };
};
