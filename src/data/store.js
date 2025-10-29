import { configureStore } from '@reduxjs/toolkit';
import concertReducers from '../features/reducers';

export default configureStore({
  reducer: {
    concerts: concertReducers
  }
});
