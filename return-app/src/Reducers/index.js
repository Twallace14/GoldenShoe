import { combineReducers } from 'redux';
import activeReturn from './activeReturn';
import { userOrder } from './userOrder';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['activeOrder', 'returnOrder'],
};

const rootReducer = combineReducers({
  activeOrder: userOrder,
  returnOrder: activeReturn,
});

export default persistReducer(persistConfig, rootReducer);
