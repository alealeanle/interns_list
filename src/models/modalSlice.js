import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddModalOpen: false,
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
  openDetailModal,
  closeDetailModal,
  openEditModal,
  closeEditModal,
} = modalSlice.actions;

export default modalSlice;
