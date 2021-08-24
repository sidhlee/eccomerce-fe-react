import { productApi } from '../services/product';

const rootReducer = {
  [productApi.reducerPath]: productApi.reducer,
};

export default rootReducer;
