export interface HomeState {
  homeData: Array<any>;
  tokenInfo: Object;
}

export enum HomeEnum {
  GET_HOME_DATA = 'GET_HOME_DATA',
  SET_HOME_DATA = 'SET_HOME_DATA',
}

export enum InfoEnum {
  GET_INFO_DATA = 'GET_INFO_DATA',
}

export interface getHomeDataAction {
  type: HomeEnum.GET_HOME_DATA;
  payload: Array<any>;
}

export interface setHomeDataAction {
  type: HomeEnum.SET_HOME_DATA;
  payload: Array<any>;
}

export interface getInfoDataAction {
  type: InfoEnum.GET_INFO_DATA;
  payload: any;
}

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

export type HomeAction = getHomeDataAction | setHomeDataAction | getInfoDataAction;
