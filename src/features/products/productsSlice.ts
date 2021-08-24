import axios, { AxiosError } from 'axios';
import { Dispatch, Reducer } from 'redux';
import { Thunk } from '../../common/types/redux-thunk';
import { IProduct } from './types';

/* ========================
 * Types
 * ======================= */

export enum ProductsActionTypes {
  LOAD = 'products/load/pending',
  LOADED = 'products/load/fulfilled',
  LOAD_FAILED = 'products/load/rejected',
}

export interface ProductsState {
  readonly products: IProduct[];
  readonly loading: boolean;
  readonly error: string;
}

//
export type ProductsAction = ReturnType<
  typeof load | typeof loaded | typeof loadFailed
>;

/* ========================
 * Action Creators
 * ======================= */

export const load = () => ({
  type: ProductsActionTypes.LOAD,
});

export const loaded = (products: IProduct[]) => ({
  type: ProductsActionTypes.LOADED,
  payload: products,
});

export const loadFailed = (error: AxiosError) => ({
  type: ProductsActionTypes.LOAD_FAILED,
  payload:
    error.response && error.response.data.message
      ? (error.response.data.message as string)
      : (error.message as string),
});

/* ========================
 * Side Effects (Thunks)
 * ======================= */

export const loadThunk: Thunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(loaded(data));
    } catch (err) {
      dispatch(loadFailed(err));
    }
  };
};

/* ========================
 * Reducer
 * ======================= */

const initialProductsState = { products: [], loading: false, error: '' };

const reducer: Reducer<ProductsState> = (
  state = initialProductsState,
  // this reducer will be called with actions from other domain,
  // so limiting the exact set of actions with ProductsAction doesn't help
  // https://stackoverflow.com/a/63904925
  action
) => {
  switch (action.type) {
    case ProductsActionTypes.LOAD:
      return { ...state, loading: true, products: [] };
    case ProductsActionTypes.LOADED:
      return { ...state, loading: false, products: action.payload };
    case ProductsActionTypes.LOAD_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
