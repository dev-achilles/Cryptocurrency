import {
  HomeEnum,
  getHomeDataAction,
  setHomeDataAction,
  InfoEnum,
  getInfoDataAction,
} from './types';

export const HomeActionCreator = {
  getHomeData: (data: Array<any>): getHomeDataAction => ({
    type: HomeEnum.GET_HOME_DATA,
    payload: data,
  }),
  setHomeData: (data: Array<any>): setHomeDataAction => ({
    type: HomeEnum.SET_HOME_DATA,
    payload: data,
  }),
  getInfoData: (info: string, data: Array<any>): getInfoDataAction => ({
    type: InfoEnum.GET_INFO_DATA,
    payload: { info, data },
  }),
};
