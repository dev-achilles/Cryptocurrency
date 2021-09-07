import { AppDispatch } from './../../store';
import axios from 'axios';
import {
  TableEnum,
  setCheckedDataAction,
  setDataAction,
  setMetricsDataAction,
  Request,
} from './types';

export const TableActionCreator = {
  setData: (res: Request): setDataAction => ({ type: TableEnum.GET_TABLE_DATA, payload: res.data }),
  setMetricsData: (res: Request): setMetricsDataAction => ({
    type: TableEnum.GET_METRICS_DATA,
    payload: res.data,
  }),
  setCheckedData: (id: string, value: boolean): setCheckedDataAction => ({
    type: TableEnum.SET_CHECKED_DATA,
    payload: { id, value },
  }),
  getTableData: () => async (dispatch: AppDispatch) => {
    try {
      const responce = await axios.get(
        'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
      );
      dispatch(TableActionCreator.setData(responce.data));
    } catch (e) {
      console.log(e);
    }
  },
  getMetricsData: (slug: any) => async (dispatch: AppDispatch) => {
    try {
      const responce = await axios.get(`https://data.messari.io/api/v1/assets/${slug}/metrics`);
      dispatch(TableActionCreator.setMetricsData(responce.data));
    } catch (e) {
      console.log(e);
    }
  },
};
