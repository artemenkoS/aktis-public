import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import userReducer from './slices/authSlice';
import modalsSlice from './slices/modalsSlice';
import tablesReducer from './slices/tablesSlice';
import visitReducer from './slices/visitSlice';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    modalsReducer: modalsSlice,
    visitReducer: visitReducer,
    tablesReducer: tablesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
