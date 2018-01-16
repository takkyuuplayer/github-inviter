import { createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './ducks';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
);

export default store;
