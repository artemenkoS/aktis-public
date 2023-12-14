import { Pagination } from '../../types';
import { apiSlice } from '../apiSlice';
import { HistoryParams, LogRecord } from './types';

interface HistoryDto {
  data: LogRecord[];
  pagination: Pagination;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query<HistoryDto, HistoryParams>({
      query: (params: HistoryParams) => ({
        url: 'api/history',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['History'],
    }),
    createLogRecord: builder.mutation<HistoryDto, Omit<LogRecord, 'id'>>({
      query: (body: LogRecord) => ({
        url: 'api/history',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['History'],
    }),
  }),
});

export const { useGetHistoryQuery, useCreateLogRecordMutation } = userApi;
