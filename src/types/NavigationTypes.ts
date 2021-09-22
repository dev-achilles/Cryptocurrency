import { Dispatch } from 'redux';

export type Props = {
  dispatch: Dispatch<any>;
  user: {
    error: boolean;
    isLoggedIn: boolean;
    name: string | null;
    role: string | null;
    token: any;
  };
};
