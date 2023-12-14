import { apiSlice } from '../apiSlice';
import { User } from './types';

export interface UserDto {
  user: User;
}
interface UsersDto {
  data: User[];
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserDto, void>({
      query: () => ({
        url: 'api/user',
      }),
      keepUnusedDataFor: 0,
    }),
    getAllUsers: builder.query<UsersDto, void>({
      query: () => ({
        url: 'api/users',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery } = userApi;
