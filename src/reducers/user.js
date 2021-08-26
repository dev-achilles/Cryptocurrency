import { GET_USER, SET_ERROR, EXIT_USER } from '../constants';

const initialState = {
  name: null,
  isLoggedIn: false,
  role: null,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      if (JSON.parse(localStorage.getItem('user')) !== null) {
        const data = JSON.parse(localStorage.getItem('user'));
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
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EXIT_USER: {
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
