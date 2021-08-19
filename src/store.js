import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import homeReducer from './reducers/home';
import tableReducer from './reducers/table';
import userReducer from './reducers/user';

const reducers = combineReducers({
  table: tableReducer,
  user: userReducer,
  home: homeReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
