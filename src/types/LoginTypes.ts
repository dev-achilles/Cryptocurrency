import { Dispatch } from 'redux';

export type Props = {
  dispatch: Dispatch<any>;
  user: {
    error: boolean;
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
    token: string | null;
  };
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type UserType = {
  name: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
};
