import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  

  tagTypes: [
    'USER',
    'RECOMMENDED_USER',
    'REQUEST',
    'POST',
    'COMMENT',
    'REACT',
    'MESSAGE',
    'NOTIFICATION',
    'MENTOR',
    'PAGE',
    'CHALLENGE',
    'BLOOD'
  ],
  endpoints: () => ({}),
});