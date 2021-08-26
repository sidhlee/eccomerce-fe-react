import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from './cartTypes';

export interface CartState {
    cartItems: ICartItem[]
}

const initialState: CartState = {
    cartItems: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addItem: (state, action: PayloadAction<ICartItem>) => {
          const addingItem = action.payload
          const existingItemIndex = state.cartItems.findIndex(item => item.variant === addingItem.variant)

          // If the adding item already exists in cart, replace it with the new one.
          if (existingItemIndex >= 0) {
              state.cartItems[existingItemIndex] = addingItem              
        } else {
              state.cartItems.push(action.payload)
          }
      },
      removeItem: (state, action: PayloadAction<number>) => {
          const removingItemIndex = state.cartItems.findIndex((item) => item.variant === action.payload)
          if (removingItemIndex >= 0) {
              state.cartItems.splice(removingItemIndex, 1)
          } else {
              throw new Error('Cannot remove non-existing item')
          }

      }
  },
});



export const { addItem: addCartItem, removeItem: removeCartItem } = cartSlice.actions

export default cartSlice.reducer;

