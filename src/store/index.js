import { configureStore } from '@reduxjs/toolkit';
import internsSlice from '@models/internsSlice';
import modalSlice from '@models/modalSlice';

const store = configureStore({
  reducer: {
    interns: internsSlice.reducer,
    modals: modalSlice.reducer,
  },
});

export default store;
