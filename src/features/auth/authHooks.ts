import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export function useAuthRedirect() {
  const user = useAppSelector((state) => state.auth.user);

  const history = useHistory();
  const { search } = useLocation();
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, redirect, user]);
}
