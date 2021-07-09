import { SET_TABLE_DATA, SORT_TABLE } from '../constants';

const byField = (field, type) => {
  if (type === 'string') {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
  if (type === 'number') {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }
};

const initialState = {
  tableData: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA: {
      const data = [];
      Object.keys(action.payload).forEach((item) => data.push(action.payload[item]));
      Array.from(data);
      return {
        ...state,
        tableData: data,
      };
    }
    case SORT_TABLE: {
      const data = state.tableData.sort(byField(action.payload.field, action.payload.type));
      return {
        ...state,
        tableData: data,
      };
    }
    default:
      return state;
  }
};

export default tableReducer;
