import { GET_TABLE_DATA, GET_METRICS_DATA, SET_CHECKED_DATA } from '../constants';

const initialState = {
  tableData: [],
  metricsData: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLE_DATA: {
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (favourites) {
        const filteredData = action.payload.map((item) => {
          const foundCrypto = favourites.find((favourite) => favourite.id === item.id);

          return {
            ...item,
            checked: !!foundCrypto,
          };
        });
        return {
          ...state,
          tableData: filteredData,
        };
      } else {
        return {
          ...state,
          tableData: action.payload,
        };
      }
    }
    case GET_METRICS_DATA: {
      return {
        ...state,
        metricsData: action.payload,
      };
    }
    case SET_CHECKED_DATA: {
      const data = [...state.tableData];
      const { id, value } = action.payload;
      data.find((item) => {
        if (item.id === id) {
          item.checked = value;
        }
      });
      return {
        ...state,
        tableData: [...data],
      };
    }
    default:
      return state;
  }
};

export default tableReducer;
