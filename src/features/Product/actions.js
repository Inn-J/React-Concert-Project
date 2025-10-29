import { createAction } from '@reduxjs/toolkit';

export const fetchConcerts = createAction('FETCH_CONCERTS');
export const addConcert = createAction('ADD_CONCERT');
export const updateConcert = createAction('UPDATE_CONCERT');
export const deleteConcert = createAction('DELETE_CONCERT');
