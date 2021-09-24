import { TableState, TableAction, TableEnum } from '../actions/Table/types';

const initialState: TableState = {
  tableData: [],
  metricsData: [],
};

const tableReducer = (state = initialState, action: TableAction) => {
  switch (action.type) {
    case TableEnum.GET_TABLE_DATA: {
      const storedData = localStorage.getItem('favourites');

      if (typeof storedData === 'string') {
        const favourites = JSON.parse(storedData);
        const filteredData = action.payload.map((item: any) => {
          const foundCrypto = favourites.find((favourite: any) => favourite.id === item.id);

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
    case TableEnum.GET_METRICS_DATA: {
      return {
        ...state,
        metricsData: action.payload,
      };
    }
    case TableEnum.SET_CHECKED_DATA: {
      const data = [...state.tableData];
      const { id, value } = action.payload;
      data.find((item) => {
        if (item.id === id) {
          item.checked = value;
        }
      });
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
