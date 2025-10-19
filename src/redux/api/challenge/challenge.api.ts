


import { IChallenge } from '@/interfaces/challenge.interface';
import { baseApi } from '@/redux/baseApi';

interface getchallengeResponse {
  data: IChallenge[];
  meta?: { total: number };
  message: string;
  success: boolean;
}

interface createchallengeResponse {
  data: IChallenge;
  message: string;
  success: boolean;
  statusCode:number

}


export const challengeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getchallenges: builder.query<
      getchallengeResponse,
      { entityId: string; entityType: string }
    >({
      query: ({ entityId, entityType }) => ({
        url: `/challenge?entityId=${entityId}&entityType=${entityType}`,
        method: 'GET',
      }),
      providesTags: (_result, _err, { entityId }) => [
        { type: 'CHALLENGE', id: `LIST-${entityId}` },
      ],
    }),

    // Create challenge
    createChallenge: builder.mutation<
      createchallengeResponse,
      { payload : FormData}
    >({
      query: ({ payload }) => ({
        url: '/challenge/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['CHALLENGE'],
    }),

    // ✅ Update challenge
    updatechallenge: builder.mutation<
      IChallenge,
      { id: string; challengeType: string; entityId: string }
    >({
      query: ({ id, challengeType }) => ({
        url: `/challenge/${id}`,
        method: 'PATCH',
        data: { challengeType },
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'CHALLENGE', id: `LIST-${entityId}` },
      ],
    }),
    removeChallenge: builder.mutation<
      { success: boolean; id: string },
      { id: string; entityId: string }
    >({
      query: ({ id }) => ({
        url: `/challenge/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { entityId }) => [
        { type: 'CHALLENGE', id: `LIST-${entityId}` },
      ],
    }),
  }),
});

export const {
  useGetchallengesQuery,
  useCreateChallengeMutation,
  useRemoveChallengeMutation,
  useUpdatechallengeMutation,
} = challengeApi;
