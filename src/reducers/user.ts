import { UserEnum, UserState, UserAction } from '../actions/User/types';

const initialState: UserState = {
  name: null,
  isLoggedIn: false,
  role: null,
  error: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserEnum.GET_USER: {
      const storedData = localStorage.getItem('user');
      if (typeof storedData === 'string') {
        const data = JSON.parse(storedData);
        return {
          ...state,
          ...data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case UserEnum.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case UserEnum.EXIT_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
