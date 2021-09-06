import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface CountryCode {
  name: string;
  code: string;
  states: null | State[];
}

interface State {
  code: string;
  name: string;
}

export const countryCodeApi = createApi({
  reducerPath: 'countryCodeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/shipping/',
  }),
  endpoints: (build) => ({
    getCountryCodes: build.query<CountryCode[], void>({
      query: () => `countries/`,
    }),
  }),
});

export const { useGetCountryCodesQuery } = countryCodeApi;
