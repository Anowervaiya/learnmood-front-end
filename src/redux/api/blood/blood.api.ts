
import { IBloodDonor, IBloodRequest } from '@/interfaces/blood.interface';
import { baseApi } from '@/redux/baseApi';

interface getbloodDonorResponse {
  data: IBloodDonor[];
  meta: { total: number };
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
  statusCode:number

}


export const bloodApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    // getbloodDonors: builder.query<getbloodDonorResponse, { pageId: string }>({
    //   query: ({ pageId }) => ({
    //     url: `/bloodDonor?createdBy=${pageId}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['BLOOD'],
    // }),

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
      invalidatesTags: ['BLOOD'],
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
  // useGetbloodDonorsQuery,
  // useCreatebloodDonorMutation,
  useCreatebloodRequestMutation,
  // useRemovebloodDonorMutation,
  // useUpdatebloodDonorMutation,
} = bloodApi;
