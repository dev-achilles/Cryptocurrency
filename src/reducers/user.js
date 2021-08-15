import { LOGIN_USER, RESET_ERROR } from '../constants';

const initialState = {
  name: null,
  isLoggedIn: false,
  role: null,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
