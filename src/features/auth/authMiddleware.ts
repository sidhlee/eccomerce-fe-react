import { Middleware } from '@reduxjs/toolkit';
import { authApi } from '../../services/authService';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  // update state with given action
  const result = next(action);

  const isLoginAction = authApi.endpoints.login.matchFulfilled(action);

  // get user data from updated state and save to localStorage
  if (isLoginAction) {
    const user = store.getState().authApi.queries.login.data;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return result;
};

export default authMiddleware;
