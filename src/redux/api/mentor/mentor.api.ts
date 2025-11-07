import { IMentor } from '@/interfaces/mentor.interface';
import { baseApi } from '@/redux/baseApi';

interface getAllMentorQuery {
    data: IMentor[];
    meta: { total: number; page: number; limit: number; totalPage: number };
    message: string;
    success: boolean;
}

export const MentorApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createMentor: builder.mutation({
      query: MentorInfo => ({
        url: '/mentor/create',
        method: 'POST',
        data: MentorInfo,
      }),
      invalidatesTags: [{ type: 'MENTOR', id: 'MENTOR_LIST' }],
    }),

    allMentor: builder.query<
      getAllMentorQuery,
      { page: number; limit: number; searchTerm?: string }
    >({
      query: ({ page, limit, searchTerm }) => ({
        url: `/mentor?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        method: 'GET',
      }),

      providesTags: result =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'MENTOR' as const,
                id: _id,
              })), // individual items
              { type: 'MENTOR' as const, id: 'MENTOR_LIST' }, // full list tag
            ]
          : [{ type: 'MENTOR' as const, id: 'MENTOR_LIST' }],
    }),
  }),
});

export const {
useCreateMentorMutation,
  useAllMentorQuery
} = MentorApi;
