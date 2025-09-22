import { baseApi } from '@/redux/baseApi';

export const PostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: PostInfo => ({
        url: '/post/create',
        method: 'POST',
        data: PostInfo,
      }),
      invalidatesTags:['POST']

    }),

    allPost: builder.query({
      query: () => ({
        url: '/post',
        method: 'GET',
      }),
      providesTags: ['POST'],
    }),
  }),
});

export const {
useCreatePostMutation,
  // useMyPostQuery,
  useAllPostQuery,
  // useDeletePostMutation,
  // useFilterByStatusPostQuery,
} = PostApi;
