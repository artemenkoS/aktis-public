import { apiSlice } from '../apiSlice';
import { Notification } from './types';

interface NotificationDto {
  data: Notification[];
}

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationDto, { id: number }>({
      query: (params) => ({
        url: 'api/notification',
        params,
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Notification'],
    }),
    markAsRead: builder.mutation<NotificationDto, { body: { ids: number[] } }>({
      query: ({ body }) => ({
        url: 'api/notification',
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery, useMarkAsReadMutation } = notificationApi;
