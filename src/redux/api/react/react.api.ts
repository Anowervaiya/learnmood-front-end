import { IReact } from '@/interfaces/react.interface';
import { baseApi } from '@/redux/baseApi';

interface ReactResponse {
  data: IReact;
  message: string;
  success: boolean;
  statusCode: number;
}


export const reactApi = baseApi.injectEndpoints({

  endpoints: builder => ({
   getUserAddedReact: builder.query<ReactResponse, { entityId: string; entityType: string; userId: string }>({
  query: ({ entityId, entityType, userId }) => ({
    url: `/react?entityId=${entityId}&entityType=${entityType}&userId=${userId}`,
    method: 'GET',
  }),
  providesTags: (result, error, { entityId, userId }) => [
    { type: 'USER_REACT', id: `${entityId}-${userId}` },
  ],
}),

    // Add react
    addReact: builder.mutation<IReact, Partial<IReact>>({
      query: data => ({
        url: '/react',
        method: 'POST',
        data,
      }),
       invalidatesTags: (_res, _err, { entityId, user }) => [
    { type: "POST", id: entityId }, // Post count refresh
    { type: "USER_REACT", id: `${entityId}-${user}` }, // initial button refresh
  ],

    }),

  
  }),
});

export const {
  useGetUserAddedReactQuery,
  useAddReactMutation,
} = reactApi;
