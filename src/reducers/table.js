import { GET_TABLE_DATA, GET_METRICS_DATA } from '../constants';

const initialState = {
  tableData: [],
  metricsData: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLE_DATA: {
      return {
        ...state,
        tableData: action.payload,
      };
    }
    case GET_METRICS_DATA: {
      return {
        ...state,
        metricsData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default tableReducer;
