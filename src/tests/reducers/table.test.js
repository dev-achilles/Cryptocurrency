import tableReducer from '../../reducers/table';
import { TableActionCreator } from '../../actions/Table';
import axios from 'axios';

it('Set Home Data', async () => {
  const responce = await axios.get(
    'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
  );
  const initialState = {
    tableData: [],
    metricsData: [],
  };

  let action = TableActionCreator.setData(responce.data);

  let newState = tableReducer(initialState, action);

  expect(newState.tableData.length).toBeGreaterThan(0);
});
