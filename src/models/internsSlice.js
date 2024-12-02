import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interns: [],
  selectedIntern: null,
};

const internsSlice = createSlice({
  name: 'interns',
  initialState,
  reducers: {
    setInterns: (state, action) => {
      state.interns = action.payload;
    },
    setSelectedIntern: (state, action) => {
      state.selectedIntern = action.payload;
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

export const {
  setInterns,
  addIntern,
  saveEditIntern,
  deleteIntern,
  setSelectedIntern,
} = internsSlice.actions;

export default internsSlice;
