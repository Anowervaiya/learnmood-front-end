import { baseApi } from '@/redux/baseApi';

export const UserApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: (userInfo: any) => ({
        url: '/user/register',
        method: 'POST',
        data: userInfo,
      }),
    }),

    deleteUser: builder.mutation({
      query: id => ({
        url: `/User/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['USER'],
    }),

    filterByStatusUser: builder.query({
      query: payload => ({
        url: `/User/filterByStatus`,
        method: 'GET',
        params: payload,
      }),
      providesTags: ['USER'],
    }),

    allUser: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
    recommendedFriends: builder.query({
      query: () => ({
        url: '/user/recommended',
        method: 'GET',
      }),
      providesTags: ['RECOMMENDED_USER'],
    }),
    sendFriendRequest: builder.mutation({
      query: reciepentId => ({
        url: `/user/friend-request/${reciepentId}`,
        method: 'POST',
        data: null,
      }),
      invalidatesTags: ['RECOMMENDED_USER'],
    }),
  }),
});

export const {
useRegisterMutation,
  useAllUserQuery,
  useDeleteUserMutation,
  useFilterByStatusUserQuery,
  useRecommendedFriendsQuery,
  useSendFriendRequestMutation,
} = UserApi;
