


import { IChallenge, IChallengeDay } from '@/interfaces/challenge.interface';
import { baseApi } from '@/redux/baseApi';

interface getchallengeResponse {
  data: IChallenge[];
  meta: { total: number };
  message: string;
  success: boolean;
}

interface createchallengeResponse {
  data: IChallenge;
  message: string;
  success: boolean;
  statusCode:number

}
interface createchallengeDayResponse {
  data: IChallengeDay;
  message: string;
  success: boolean;
  statusCode:number

}


export const challengeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getchallenges: builder.query<
      getchallengeResponse,
      { pageId: string }
    >({
      query: ({ pageId }) => ({
        url: `/challenge?createdBy=${pageId}`,
        method: 'GET',
      }),
      providesTags:  [ 'CHALLENGE' ],
    }),

    // Create challenge
    createChallenge: builder.mutation<
      createchallengeResponse,
      { payload: FormData }
    >({
      query: ({ payload }) => ({
        url: '/challenge/create',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ['CHALLENGE'],
    }),

    createChallengeDay: builder.mutation<
      createchallengeDayResponse,
      {  payload: FormData }
    >({
      query: ({ payload }) => ({
        url: `/challenge/create-day`,
        method: 'POST',
        data: payload ,
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
  useCreateChallengeDayMutation,
  useRemoveChallengeMutation,
  useUpdatechallengeMutation,
} = challengeApi;
