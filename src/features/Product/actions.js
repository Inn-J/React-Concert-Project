import { createAction } from '@reduxjs/toolkit';

export const fetchProducts = createAction('FETCH_PRODUCTS');
export const getConcertById = createAction('concerts/getById');
export const addProduct = createAction('ADD_PRODUCT');
export const updateProduct = createAction('UPDATE_PRODUCT');
export const deleteProduct = createAction('DELETE_PRODUCT');
