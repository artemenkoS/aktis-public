import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

import { authApi } from '../../api/auth/authApi';
import { AuthResponse } from '../../api/auth/types';
import { userApi, UserDto } from '../../api/user/userApi';
import { RootState } from '../store';

interface User {
  user: { id: number; role: number } | null;
}

const initialState: User = {
  user: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: number; role: number } | null>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.auth.matchFulfilled, (store, { payload }: { payload: AuthResponse }) => {
      localStorage.setItem('token', payload.token);
      store.user = payload.data;

      toast.success('Успешная авторизация.');
    });
    builder.addMatcher(authApi.endpoints.auth.matchRejected, () => {
      localStorage.setItem('token', '');

      toast.error('Ошибка авторизации.');
    });
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (store, { payload }: { payload: UserDto }) => {
      store.user = { id: payload.user.id, role: payload.user.role };
    });
  },
});

export const userSelector = (state: RootState) => state.userReducer.user;

export default userSlice.reducer;
