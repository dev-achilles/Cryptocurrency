import { GET_HOME_DATA, SET_HOME_DATA } from '../constants';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const start = '2021-07-26T09:00:00';
const end = '2021-07-26T22:00:00';

const initialState = {
  homeData: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_DATA: {
      const items = [...action.payload];
      items.forEach((item) => setCategoryColumn(start, end, item));
      return {
        ...state,
        homeData: [...items],
      };
    }
    case SET_HOME_DATA: {
      const items = [...action.payload];
      items.forEach((item) => setCategoryColumn(start, end, item));
      return {
        ...state,
        homeData: [...items],
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
  if (result) {
    Data.column = 'Active';
    const duration = moment.duration(nowDate.diff(current));
    const hours = duration.asHours();
    if (hours < 1) {
      Data.dateActive = '< 1h left';
    } else {
      Data.dateActive = `${Math.floor(hours)}h left`;
    }
  } else {
    if (moment(current).isSameOrAfter(end)) {
      Data.column = 'Upcoming';
      const duration = moment.duration(moment(current).diff(nowDate));
      const hours = duration.asHours();
      if (hours < 25) {
        Data.dateActive = `in ${Math.floor(hours)}h`;
      } else {
        Data.dateActive = `in ${moment(current).format('MMM Do')}`;
      }
    }
    if (moment(current).isSameOrBefore(start)) {
      Data.column = 'Ended';
      const duration = moment.duration(nowDate.diff(current));
      const hours = duration.asHours();
      if (hours < 25) {
        Data.dateActive = `Ended: ${Math.floor(hours)}h left`;
      } else {
        Data.dateActive = `Ended: ${moment(current).format('MMM Do')}`;
      }
    }
  }
};

export default homeReducer;
