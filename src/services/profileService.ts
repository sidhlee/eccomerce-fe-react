import { RootState } from '../app/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../features/auth/authTypes';

export interface UserProfileRequest {
  id: number;
}

export interface ProfileUpdateRequest {
  username: string;
  email: string;
  password: string;
}

// https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/profile/',
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
    userProfile: build.query<User, UserProfileRequest>({
      query: (id) => ({ url: `${id}` }),
    }),
    profileUpdate: build.mutation<User, ProfileUpdateRequest>({
      query(body) {
        return {
          url: 'update/',
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const { useUserProfileQuery, useProfileUpdateMutation } = profileApi;
