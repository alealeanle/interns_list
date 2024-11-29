import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interns: [],
};

const internsSlice = createSlice({
  name: 'interns',
  initialState,
  reducers: {
    setInterns: (state, action) => {
      state.interns = action.payload;
    },
    addIntern: (state, action) => {
      state.interns.push(action.payload);
    },
    saveEditIntern: (state, action) => {
      state.interns = state.interns.map(intern =>
        intern.id === action.payload.id ? action.payload : intern,
      );
    },
    deleteIntern: (state, action) => {
      state.interns = state.interns.filter(
        intern => intern.id !== action.payload,
      );
    },
  },
});

export const { setInterns, addIntern, saveEditIntern, deleteIntern } =
  internsSlice.actions;

export default internsSlice;
