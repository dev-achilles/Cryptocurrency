import { Data } from '../../types/MetricsTypes';

export interface TableState {
  tableData: Array<any>;
  metricsData: Array<any>;
}

export enum TableEnum {
  GET_TABLE_DATA = 'GET_TABLE_DATA',
  GET_METRICS_DATA = 'GET_METRICS_DATA',
  SET_CHECKED_DATA = 'SET_CHECKED_DATA',
}

export interface setDataAction {
  type: TableEnum.GET_TABLE_DATA;
  payload: Array<any>;
}

export interface setMetricsDataAction {
  type: TableEnum.GET_METRICS_DATA;
  payload: Array<any>;
}

export interface setCheckedDataAction {
  type: TableEnum.SET_CHECKED_DATA;
  payload: any;
}

export interface Request {
  data: Array<any>;
}

export type TableAction = setDataAction | setMetricsDataAction | setCheckedDataAction;
