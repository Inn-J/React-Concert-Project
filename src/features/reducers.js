import { createReducer } from '@reduxjs/toolkit';
import {
  fetchProducts,
  getConcertById,
  addProduct,
  updateProduct,
  deleteProduct,
} from './Product/actions';

let currentProductId = 9;

export default createReducer([], (builder) => {
  builder
    .addCase(fetchProducts, (state, action) => {
      return action.payload;
    })
    .addCase(getConcertById, (state, action) => {
      state.selected = state.list.find(
        (concert) => concert.id === action.payload
      );
    })
    .addCase(addProduct, (state, action) => {
      state.push({ id: ++currentProductId, ...action.payload });
    })
    .addCase(updateProduct, (state, action) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      state[productIndex] = action.payload;
    })
    .addCase(deleteProduct, (state, action) => {
      const productIndex = state.findIndex(
        (product) => product.id === action.payload.id
      );
      state.splice(productIndex, 1);
    });
});
