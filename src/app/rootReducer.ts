import { productApi } from '../services/productService';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = {
  [productApi.reducerPath]: productApi.reducer,
  cart: cartReducer,
  auth: authReducer,
};

export default rootReducer;
