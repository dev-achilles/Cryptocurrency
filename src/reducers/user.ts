import { UserEnum, UserState, UserAction } from '../actions/User/types';

const initialState: UserState = {
  token: null,
  name: null,
  isLoggedIn: false,
  role: null,
  error: false,
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case UserEnum.GET_USER: {
      const storedData = localStorage.getItem('token');
      if (typeof storedData === 'string') {
        const data = storedData;
        return {
          ...state,
          token: data,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case UserEnum.LOGIN_USER: {
      const token = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        token: token,
        isLoggedIn: true,
      };
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
    case UserEnum.SET_USER: {
      return {
        ...state,
        name: action.payload.name,
        isLoggedIn: true,
        role: 'admin',
      };
    }
    default:
      return state;
  }
};

export default userReducer;
