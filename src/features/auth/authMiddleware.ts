import { Middleware } from '@reduxjs/toolkit';
import { logOut, setCredentials } from './authSlice';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  // update state with given action
  const result = next(action);

  const isLoginAction = setCredentials.match(action);
  const isLogoutAction = logOut.match(action);

  // get user data from updated state and save to localStorage
  if (isLoginAction) {
    const user = store.getState().auth.user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  if (isLogoutAction) {
    localStorage.removeItem('user');
  }

  return result;
};

export default authMiddleware;
