import { SET_TABLE_DATA, SORT_TABLE } from '../constants';

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
      const data = [...state.tableData];
      if (action.payload.type === 'string') {
        data.sort((a, b) => {
          if (a[action.payload.key] < b[action.payload.key]) {
            return action.payload.direction === 'ascending' ? -1 : 1;
          }
          if (a[action.payload.key] > b[action.payload.key]) {
            return action.payload.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }

      if (action.payload.type === 'number') {
        data.sort((a, b) => {
          if (action.payload.direction === 'descending') {
            return (
              b[action.payload.key].market_data.price_usd -
              a[action.payload.key].market_data.price_usd
            );
          }
          if (action.payload.direction === 'ascending') {
            return (
              a[action.payload.key].market_data.price_usd -
              b[action.payload.key].market_data.price_usd
            );
          }
        });
      }

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
