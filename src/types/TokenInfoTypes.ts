import { AppDispatch } from '../store';

export type CryptocurrenciesType = {
  name: string;
  category: string;
  goal: string;
  interest: string;
  dateActive: string;
  column: string;
  date: string;
  important: string;
  ticker: string;
  tokenType: string;
  tokenPrice: string;
  fundraisingGoal: string;
  totalTokens: string;
  tokenSale: string;
  roleOfToken: string;
  links: Array<string>;
  images: {
    logo: string;
    img: string;
    video: string;
  };
};

export type Props = {
  dispatch: AppDispatch;
  tokenInfo: CryptocurrenciesType;
};

export type ParamTypes = {
  info: string;
};
