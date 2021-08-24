import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type Thunk = ActionCreator<
  // <R, S, E, A>
  ThunkAction<void, ProductsState, null, Action<string>>
>;
