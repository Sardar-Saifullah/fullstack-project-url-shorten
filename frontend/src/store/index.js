import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { urlReducer } from './reducers/urlReducer';

const rootReducer = combineReducers({
  url: urlReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export default store;