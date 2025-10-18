import { baseApi } from '@/redux/baseApi';

export const MentorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createMentor: builder.mutation({
      query: MentorInfo => ({
        url: '/mentor/create',
        method: 'POST',
        data: MentorInfo,
      }),
      invalidatesTags: ['MENTOR'],
    }),

    allMentor: builder.query({
      query: ({ page, limit }) => ({
        url: `/Mentor?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['MENTOR'],
    }),
 
  }),
});

export const {
useCreateMentorMutation,
  useAllMentorQuery
} = MentorApi;
