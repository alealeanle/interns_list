import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddModalOpen: false,
  valueBirthDate: false,
  valueStartDate: false,
  valueEndDate: false,
  isDetailModalOpen: false,
  selectedIntern: null,
  isEditModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openAddModal: state => {
      state.isAddModalOpen = true;
    },
    closeAddModal: state => {
      state.isAddModalOpen = false;
      state.valueBirthDate = false;
      state.valueStartDate = false;
      state.valueEndDate = false;
    },
    setColorBirthDate: state => {
      state.valueBirthDate = true;
    },
    unsetColorBirthDate: state => {
      state.valueBirthDate = false;
    },
    setColorStartDate: state => {
      state.valueStartDate = true;
    },
    unsetColorStartDate: state => {
      state.valueStartDate = false;
    },
    setColorEndDate: state => {
      state.valueEndDate = true;
    },
    unsetColorEndDate: state => {
      state.valueEndDate = false;
    },
    openDetailModal: (state, action) => {
      state.isDetailModalOpen = true;
      state.selectedIntern = action.payload;
    },
    closeDetailModal: state => {
      state.isDetailModalOpen = false;
      state.selectedIntern = null;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedIntern = action.payload;
    },
    closeEditModal: state => {
      state.isEditModalOpen = false;
      state.valueBirthDate = false;
      state.valueStartDate = false;
      state.valueEndDate = false;
      state.selectedIntern = null;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
  setColorBirthDate,
  unsetColorBirthDate,
  setColorStartDate,
  unsetColorStartDate,
  setColorEndDate,
  unsetColorEndDate,
  openDetailModal,
  closeDetailModal,
  openEditModal,
  closeEditModal,
} = modalSlice.actions;

export default modalSlice;
