import { apiSlice } from '../apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (body) => ({
        url: 'api/auth',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApi;
