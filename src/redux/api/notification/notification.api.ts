import { baseApi } from '@/redux/baseApi';
import { io } from 'socket.io-client';

let socket: any; // keep socket reference

export const notificationApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query({
      query: () => ({
        url: '/notification',
        method: 'GET',
      }),
      providesTags: ['NOTIFICATION'],

      // 👇 RTK Query socket subscription
      async onCacheEntryAdded(
        { userId },
        { updateCachedData, cacheEntryRemoved }
      ) {
        if (!socket) {
          socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
            query: { userId: userId },
            withCredentials: true,
          });
        }

        const notificationHandler = (newNotification: any) => {
          if (
            newNotification.receiver === userId ||
            newNotification.sender === userId
          ) {
            updateCachedData(draft => {
              // ✅ check if draft has data array
              
              if (draft.data) {
                draft.data.push(newNotification);
              } else {
                // fallback if draft is array directly
                draft.push(newNotification);
              }
            });
          }
        };

        socket.on('newNotification', notificationHandler);

        // Cleanup when unsubscribed
        await cacheEntryRemoved;
        socket.off('newNotification', notificationHandler);
      },
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notification/${notificationId}`,
        method:'PATCH'
      }),
      invalidatesTags:["NOTIFICATION"]
    })
  }),
});

export const { useGetNotificationQuery , useMarkAsReadMutation} = notificationApi;
