import { AppDispatch } from '../store';

export type Props = {
  dispatch: AppDispatch;
  metricsData: {
    name: String;
    symbol: String;
    supply: {
      liquid: String;
    };
  };
};
