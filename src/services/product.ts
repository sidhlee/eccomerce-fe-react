import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../features/products/types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    // <output, input>
    getProducts: builder.query<IProduct[], undefined>({
      query: () => 'productss',
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
