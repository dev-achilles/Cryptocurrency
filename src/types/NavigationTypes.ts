import { AppDispatch } from '../store';

export type Props = {
  dispatch: AppDispatch;
  user: {
    error: boolean;
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
    token: any;
  };
};
