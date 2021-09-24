import { Dispatch } from 'redux';

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
  dispatch: Dispatch<any>;
  tokenInfo: CryptocurrenciesType;
};

export type ParamTypes = {
  info: string;
};
