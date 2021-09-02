import { productApi } from '../services/productService';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../services/authService';

const rootReducer = {
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  cart: cartReducer,
  auth: authReducer,
};

export default rootReducer;
