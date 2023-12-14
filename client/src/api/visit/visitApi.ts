import toast from 'react-hot-toast';

import { setEditableVisit } from '../../store/slices/modalsSlice';
import { resetSlots } from '../../store/slices/visitSlice';
import { apiSlice } from '../apiSlice';
import { VisitDto, VisitMutationBody, VisitParams } from './types';

export const visitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVisits: builder.query<VisitDto, VisitParams>({
      query: (params: VisitParams) => ({
        params: params,
        url: 'api/visit',
      }),
      providesTags: ['Visit'],
      keepUnusedDataFor: 0,
    }),

    createVisit: builder.mutation<VisitDto, { body: VisitMutationBody }>({
      query: ({ body }) => ({
        body,
        url: 'api/visit',
        method: 'POST',
      }),
      invalidatesTags: ['Visit'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetSlots());
          toast.success('Запись успешно создана.');
        } catch (error) {
          toast.error('Не удалось создать запись.');
        }
      },
    }),
    updateVisit: builder.mutation<VisitDto, { body: VisitMutationBody; id: number }>({
      query: ({ body, id }) => ({
        body,
        url: `api/visit/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Visit'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(resetSlots());
          dispatch(setEditableVisit(null));
          toast.success('Запись успешно изменена.');
        } catch (error) {
          toast.error('Не удалось изменить запись.');
        }
      },
    }),

    deleteVisit: builder.mutation<VisitDto, number>({
      query: (id: number) => ({
        url: `api/visit/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Visit'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Запись успешно удалена.');
        } catch (error) {
          toast.error('Не удалось удалить запись.');
        }
      },
    }),
  }),
});

export const {
  useGetVisitsQuery,
  useCreateVisitMutation,
  useLazyGetVisitsQuery,
  useDeleteVisitMutation,
  useUpdateVisitMutation,
  usePrefetch,
} = visitApi;
