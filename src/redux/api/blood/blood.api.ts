import { IBloodDonor, IBloodRequest } from '@/interfaces/blood.interface';
import { IUser } from '@/interfaces/user.interface';
import { baseApi } from '@/redux/baseApi';

interface getbloodDonorResponse {
  data: IUser[];
  meta: { total: number; page: number; limit: number; totalPage: number };
  message: string;
  success: boolean;
}
interface getBloodRequestResponse {
  data: IBloodRequest[];
  meta: { total: number; page: number; limit: number; totalPage: number };
  message: string;
  success: boolean;
}

interface createbloodDonorResponse {
  data: IBloodDonor;
  message: string;
  success: boolean;
  statusCode: number;
}
interface createbloodRequestResponse {
  data: IBloodRequest;
  message: string;
  success: boolean;
  statusCode: number;
}

export const bloodApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // // Create bloodDonor
    // createbloodDonor: builder.mutation<
    //   createbloodDonorResponse,
    //   { payload: FormData }
    // >({
    //   query: ({ payload }) => ({
    //     url: '/bloodDonor/create',
    //     method: 'POST',
    //     data: payload,
    //   }),
    //   invalidatesTags: ['BLOOD'],
    // }),

    createbloodRequest: builder.mutation<
      createbloodRequestResponse,
      { payload: IBloodRequest }
    >({
      query: ({ payload }) => ({
        url: `/blood/blood-request`,
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: [{ type: 'BLOOD', id: 'BLOOD_REQ_LIST' }],
    }),

    getbloodRequest: builder.query<
      getBloodRequestResponse,
      { page: number; limit: number; location?: string; bloodGroup?: string }
    >({
      query: ({ page, limit, location = '', bloodGroup = '' }) => {
        const encodedBloodGroup = encodeURIComponent(bloodGroup);

        return {
          url: `/blood/blood-request?page=${page}&limit=${limit}&bloodGroup=${encodedBloodGroup}&searchTerm=${location}`,
          method: 'GET',
        };
      },

      providesTags: result =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'BLOOD' as const,
                id: _id,
              })), // individual items
              { type: 'BLOOD' as const, id: 'BLOOD_REQ_LIST' }, // full list tag
            ]
          : [{ type: 'BLOOD' as const, id: 'BLOOD_REQ_LIST' }],
    }),

    getbloodDonor: builder.query<
      getbloodDonorResponse,
      { page: number; limit: number; location?: string; bloodGroup?: string }
    >({
      query: ({ page, limit, location = '', bloodGroup = '' }) => {
        const encodedBloodGroup = encodeURIComponent(bloodGroup);
        return {
          url: `/blood/blood-donor?page=${page}&limit=${limit}&blood=${encodedBloodGroup}&searchTerm=${location}`,
          method: 'GET',
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'BLOOD' as const,
                id: _id,
              })), // individual items
              { type: 'BLOOD' as const, id: 'BLOOD_DONOR_LIST' }, // full list tag
            ]
          : [{ type: 'BLOOD' as const, id: 'BLOOD_DONOR_LIST' }],
    }),

    // ✅ Update bloodDonor
    // updatebloodDonor: builder.mutation<
    //   IBloodDonor,
    //   { id: string; bloodDonorType: string; entityId: string }
    // >({
    //   query: ({ id, bloodDonorType }) => ({
    //     url: `/bloodDonor/${id}`,
    //     method: 'PATCH',
    //     data: { bloodDonorType },
    //   }),
    //   invalidatesTags: (_res, _err, { entityId }) => [
    //     { type: 'BLOOD', id: `LIST-${entityId}` },
    //   ],
    // }),
    // removebloodDonor: builder.mutation<
    //   { success: boolean; id: string },
    //   { id: string; entityId: string }
    // >({
    //   query: ({ id }) => ({
    //     url: `/BLOOD/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (_res, _err, { entityId }) => [
    //     { type: 'BLOOD', id: `LIST-${entityId}` },
    //   ],
    // }),
  }),
});

export const {
  // useCreatebloodDonorMutation,
  useCreatebloodRequestMutation,
  useGetbloodRequestQuery,
  useGetbloodDonorQuery,
  // useRemovebloodDonorMutation,
  // useUpdatebloodDonorMutation,
} = bloodApi;
