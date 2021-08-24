import { createSlice } from '@reduxjs/toolkit';

export interface ProductsState {}

const initialState: ProductsState = {};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
