import { GET_TABLE_DATA, GET_METRICS_DATA } from '../constants';

const initialState = {
  tableData: [],
  metricsData: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLE_DATA: {
      const favourites = JSON.parse(localStorage.getItem('favourites'));

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
