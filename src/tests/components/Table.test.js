import React from 'react';
import renderer from 'react-test-renderer';
import TableOfCurrency from '../../components/Table';
import axios from 'axios';

it('render correctly', async () => {
  const responce = await axios.get(
    'https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd',
  );
  const tree = renderer.create(<TableOfCurrency tableData={responce.data.data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
