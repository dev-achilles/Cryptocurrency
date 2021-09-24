import {
  HomeEnum,
  getHomeDataAction,
  setHomeDataAction,
  InfoEnum,
  getInfoDataAction,
  CryptocurrenciesType,
} from './types';

export const HomeActionCreator = {
  getHomeData: (data: CryptocurrenciesType[]): getHomeDataAction => ({
    type: HomeEnum.GET_HOME_DATA,
    payload: data,
  }),
  setHomeData: (data: CryptocurrenciesType[]): setHomeDataAction => ({
    type: HomeEnum.SET_HOME_DATA,
    payload: data,
  }),
  getInfoData: (info: string, data: CryptocurrenciesType[]): getInfoDataAction => ({
    type: InfoEnum.GET_INFO_DATA,
    payload: { info, data },
  }),
};
