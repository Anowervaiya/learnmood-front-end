import { baseApi } from '@/redux/baseApi';

export const PostApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: PostInfo => ({
        url: '/post/create',
        method: 'POST',
        data: PostInfo,
      }),
      invalidatesTags: ['POST'],
    }),

    allPost: builder.query({
      query: ({ page, limit }) => ({
        url: `/post?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['POST'],
    }),
    mypost: builder.query({
      query: ({ page, limit, userId }) => ({
        url: `/post?page=${page}&limit=${limit}&user=${userId}`,
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
  useMypostQuery
  // useDeletePostMutation,
  // useFilterByStatusPostQuery,
} = PostApi;
