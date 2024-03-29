import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  version: 1,
}, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer instead of persistReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
