import { SET_TABLE_DATA } from '../constants';

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
    default:
      return state;
  }
};

export default tableReducer;
