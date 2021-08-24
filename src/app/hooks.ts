// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

// Create pre-typed versions of the useDispatch and useSelector
// with RootState and AppDispatch directly inferred from the store
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
