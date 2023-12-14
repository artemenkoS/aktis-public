import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.DEV ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD,

  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    localStorage.clear();
    window.location.href = '/';
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Visit', 'Patient', 'History', 'Notification'],
});
