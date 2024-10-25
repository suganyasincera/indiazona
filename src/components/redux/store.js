import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import FormReducer from './formslice';
const persistConfig = {
  key: 'root',
  storage, // Use localStorage as default storage
};

const rootReducer = combineReducers({
  form: FormReducer, // Add your slice reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

 const store = configureStore({
  reducer: persistedReducer,
    });

    const persistor = persistStore(store);

    export { store, persistor };




