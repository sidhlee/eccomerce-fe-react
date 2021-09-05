import { productApi } from '../services/productService';
import { authApi } from '../services/authService';
import { profileApi } from '../services/profileService';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = {
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  cart: cartReducer,
  auth: authReducer,
};

export default rootReducer;
