import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import tableReducer from './reducers/table';

const reducers = combineReducers({
  table: tableReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
