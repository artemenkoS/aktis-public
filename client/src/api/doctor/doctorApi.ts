import { apiSlice } from '../apiSlice';
import { DoctorDto } from './types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<DoctorDto, void>({
      query: () => ({
        url: 'api/doctor',
      }),
    }),
  }),
});

export const { useGetDoctorsQuery } = userApi;
