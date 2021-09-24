import { Dispatch } from 'redux';

export type Props = {
  dispatch: Dispatch<any>;
  register: {
    message: string;
    error: boolean;
    success: boolean;
  };
};

export type Data = {
  name: string;
  email: string;
  password: string;
  password_2: string;
};
