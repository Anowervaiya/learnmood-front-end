
import { baseApi } from '@/redux/baseApi';
import { io } from 'socket.io-client';

let socket: any; // keep socket reference

export const messageApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: payload => ({
        url: `/message/send`,
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['MESSAGE'],
    }),

    getMessage: builder.query({
      query: ({ userToChatId, authUserId , page, limit}) => ({
        url: '/message/receive',                     
        method: 'GET',
        params: { userToChatId, authUserId ,page,limit},
      }),
      providesTags: ['MESSAGE'],

      // 👇 RTK Query socket subscription
      async onCacheEntryAdded(
          { userToChatId, authUserId },
        { updateCachedData, cacheEntryRemoved }
      ) {
        if (!socket) {
          socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
            query: { userId: authUserId },
            withCredentials: true,
          });
        }   
        const messageHandler = (newMessage: any) => {      
          if (
            (newMessage.senderId === userToChatId &&
              newMessage.receiverId === authUserId) ||
            (newMessage.senderId === authUserId &&
              newMessage.receiverId === userToChatId)
          ) {
            updateCachedData(draft => {
         
              // ✅ check if draft has data array
              if (draft.data) {
                draft.data.push(newMessage);
              } else {
                // fallback if draft is array directly
                draft.push(newMessage);
              }
            });
          }
        };

        socket.on('newMessage', messageHandler);


        // Cleanup when unsubscribed
        await cacheEntryRemoved;
        socket.off('newMessage', messageHandler);
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessageQuery
} = messageApi;
