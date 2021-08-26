import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { GET_HOME_DATA, SET_HOME_DATA, GET_INFO_DATA, start, end } from '../constants';

const moment = extendMoment(Moment);

const initialState = {
  homeData: [],
  tokenInfo: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_DATA: {
      const items = [...action.payload];
      const newItems = [];
      items.forEach((item) => newItems.push(setCategoryColumn(start, end, item)));

      return {
        ...state,
        homeData: [...newItems],
      };
    }
    case SET_HOME_DATA: {
      const items = [...action.payload];
      const newItems = [];
      items.forEach((item) => newItems.push(setCategoryColumn(start, end, item)));

      return {
        ...state,
        homeData: [...newItems],
      };
    }
    case GET_INFO_DATA: {
      const { info, data } = action.payload;
      const item = data.find((item) => item.name === info);

      return {
        ...state,
        tokenInfo: item,
      };
    }
    default:
      return state;
  }
};

const setCategoryColumn = (start, end, Data) => {
  const current = Data.date;
  const nowDate = moment(new Date());
  const result = moment(current).isBetween(start, end, 'minutes');

  let dataObj = Data;

  if (result) {
    dataObj.column = 'Active';
    const duration = moment.duration(nowDate.diff(current));
    const hours = duration.asHours();
    if (hours < 1) {
      dataObj.dateActive = '< 1h left';
    } else {
      dataObj.dateActive = `${Math.floor(hours)}h left`;
    }
  } else {
    if (moment(current).isSameOrAfter(end)) {
      dataObj.column = 'Upcoming';
      const duration = moment.duration(moment(current).diff(nowDate));
      const hours = duration.asHours();
      if (hours < 25) {
        dataObj.dateActive = `in ${Math.floor(hours)}h`;
      } else {
        dataObj.dateActive = `in ${moment(current).format('MMM Do')}`;
      }
    }
    if (moment(current).isSameOrBefore(start)) {
      dataObj.column = 'Ended';
      const duration = moment.duration(nowDate.diff(current));
      const hours = duration.asHours();
      if (hours < 25) {
        dataObj.dateActive = `Ended: ${Math.floor(hours)}h left`;
      } else {
        dataObj.dateActive = `Ended: ${moment(current).format('MMM Do')}`;
      }
    }
  }

  return dataObj;
};

export default homeReducer;
