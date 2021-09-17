import { RegisterEnum, RegisterState, RegisterAction } from '../actions/Register/types';

const initialState: RegisterState = {
  message: '',
  error: false,
  success: false,
};

const registerReducer = (state = initialState, action: RegisterAction) => {
  switch (action.type) {
    case RegisterEnum.REGISTER_USER: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case RegisterEnum.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case RegisterEnum.SUCCESS_REGISTER: {
      return {
        ...state,
        success: action.payload,
      };
    }
    default:
      return state;
  }
};

export default registerReducer;
