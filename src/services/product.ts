import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct, IVariant } from '../features/products/productsTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    // <output, input>
    getProducts: builder.query<IProduct[], undefined>({
      query: () => 'products',
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `products/${id}`,
    }),
    getVariantById: builder.query<IVariant, string>({
      query: (id) => `variant/${id}`
    })
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useGetVariantByIdQuery } = productApi;
