import homeReducer from '../../reducers/home';
import { HomeActionCreator } from '../../actions/Home';
import db from '../../db';

it('Get Info Data', () => {
  let action = HomeActionCreator.getInfoData('PolkaCipher', db.cryptocurrency);
  const initialState = {
    homeData: [],
    tokenInfo: null,
  };
  let newState = homeReducer(initialState, action);

  expect(newState.tokenInfo.name).toBe('PolkaCipher');
});
