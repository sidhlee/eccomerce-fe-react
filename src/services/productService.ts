import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IVariant } from '../features/products/productsTypes';

export const productApi = createApi({
  // Defaults to 'api'. if you call createApi more than once in your application,
  // you will need to provide a unique value here.
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products/' }),
  endpoints: (builder) => ({
    // <output, input>
    getProducts: builder.query<IProduct[], undefined>({
      query: () => '',
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `${id}`,
    }),
    getVariantById: builder.query<IVariant, string>({
      query: (id) => `variant/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetVariantByIdQuery,
} = productApi;
