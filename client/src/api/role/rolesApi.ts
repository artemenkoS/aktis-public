import { apiSlice } from '../apiSlice';
import { Role } from './types';

interface RolesDto {
  data: Role[];
}
export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<RolesDto, void>({
      query: () => ({
        url: 'api/role',
      }),
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
