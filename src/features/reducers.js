import { createReducer } from '@reduxjs/toolkit';
import {
  fetchConcerts,
  addConcert,
  updateConcert,
  deleteConcert,
} from './Product/actions';


export default createReducer([], (builder) => {
  builder
    .addCase(fetchConcerts, (state, action) => {
      return action.payload;
    })
    .addCase(addConcert, (state, action) => {
      const maxId = state.length > 0 ? Math.max(...state.map((c) => c.id)) : 0;
      const newId = maxId + 1;
      state.push({ id: newId, ...action.payload });
    })
    .addCase(updateConcert, (state, action) => {
      const concertIndex = state.findIndex(
        (concert) => concert.id === action.payload.id
      );
      state[concertIndex] = action.payload;
    })
    .addCase(deleteConcert, (state, action) => {
      const concertIndex = state.findIndex(
        (concert) => concert.id === action.payload.id
      );
      state.splice(concertIndex, 1);
    });
});
