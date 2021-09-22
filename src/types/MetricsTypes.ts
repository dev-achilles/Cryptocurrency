import { Dispatch } from 'react';

export type Props = {
  dispatch: Dispatch<any>;
  metricsData: Array<any>;
};

export type Data = {
  name: String;
  symbol: String;
  supply: {
    liquid: String;
  };
};
