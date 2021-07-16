import axios from 'axios';
import { SET_TABLE_DATA } from '../constants';

export const setTableData = () => async (dispatch) => {
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
    type: SET_TABLE_DATA,
    payload: res.data,
  };
};
