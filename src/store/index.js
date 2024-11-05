import { configureStore } from '@reduxjs/toolkit';
import internsSlice from '@models/internsSlice';

const store = configureStore({
  reducer: {
    interns: internsSlice.reducer,
  },
});

export default store;
