import { AppDispatch } from '../store';

export type DialogTypes = {
  open: boolean;
  role?: string | null;
  name?: string | null;
};

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

export type DialogValuesType = {
  name: string | undefined;
  category: string | undefined;
  goal: string | undefined;
  interest: string | undefined;
  dateActive: string | undefined;
  column: string | undefined;
  date: string | undefined;
  important: string | undefined;
  ticker: string | undefined;
  tokenType: string | undefined;
  tokenPrice: string | undefined;
  fundraisingGoal: string | undefined;
  totalTokens: string | undefined;
  tokenSale: string | undefined;
  roleOfToken: string | undefined;
  links: Array<string> | undefined;
  images: {
    logo: string | undefined;
    img: string | undefined;
    video: string | undefined;
  };
};

export type Props = {
  dispatch: AppDispatch;
  homeData: CryptocurrenciesType[];
  user: {
    error: boolean;
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
  };
};
