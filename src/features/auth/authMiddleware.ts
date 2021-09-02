import { Middleware } from '@reduxjs/toolkit';
import { setCredentials } from './authSlice';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  // update state with given action
  const result = next(action);

  const isLoginAction = setCredentials.match(action);

  // get user data from updated state and save to localStorage
  if (isLoginAction) {
    const user = store.getState().auth.user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return result;
};

export default authMiddleware;
