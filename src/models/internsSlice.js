import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interns: JSON.parse(localStorage.getItem('interns')) || [],
};

const internsSlice = createSlice({
  name: 'interns',
  initialState,
  reducers: {
    addIntern: (state, action) => {
      state.interns.push(action.payload);
      localStorage.setItem('interns', JSON.stringify(state.interns));
    },
    saveIntern: (state, action) => {
      state.interns.push(action.payload);
      localStorage.setItem('interns', JSON.stringify(state.interns));
    },
    deleteIntern: (state, action) => {
      state.interns = state.interns.filter(
        intern => intern.id !== action.payload,
      );
      localStorage.setItem('interns', JSON.stringify(state.interns));
    },
  },
});

export const { addIntern, deleteIntern } = internsSlice.actions;

export default internsSlice;
