import {configureStore} from '@reduxjs/toolkit';

import FormReducer from './formslice';


  export const store = configureStore({
  reducer: {
    form:FormReducer,

  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })

})




