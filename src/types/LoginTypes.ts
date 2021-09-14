import { AppDispatch } from '../store';

export type Props = {
  dispatch: AppDispatch;
  user: {
    error: boolean;
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
  };
};

export type LoginDataType = {
  email: string;
  password: string | number;
};

export type UserType = {
  name: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
};
