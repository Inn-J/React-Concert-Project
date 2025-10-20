import { configureStore } from '@reduxjs/toolkit';
import productReducers from '../features/reducers';

export default configureStore({
  reducer: {
    products: productReducers
  }
});
