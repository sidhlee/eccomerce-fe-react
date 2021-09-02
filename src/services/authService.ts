import { RootState } from '../app/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../features/auth/authTypes';

export interface LoginRequest {
  // TODO: change username to email because that's what it is!
  username: string;
  password: string;
}

// https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
export const authApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/users/',
    prepareHeaders: (headers, { getState }) => {
      // if we have a token in the store, use that.
      // RootState is directly typed from ReturnType of store.getState
      const token = (getState() as RootState).auth.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    // mutation<ResultType, QueryArg>
    login: build.mutation<User, LoginRequest>({
      query(body) {
        return {
          url: 'login/',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
