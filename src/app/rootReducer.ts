import { productApi } from '../services/product';
import cartReducer from '../features/cart/cartSlice'

const rootReducer = {
  [productApi.reducerPath]: productApi.reducer,
  cart: cartReducer
};

export default rootReducer;
