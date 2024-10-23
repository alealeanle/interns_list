import { useDispatch, useSelector } from 'react-redux';
import {
  closeAddModal,
  closeDetailModal,
  closeEditModal,
} from '@models/modalSlice';
import s from './Modal.module.scss';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { isAddModalOpen, isDetailModalOpen, isEditModalOpen } = useSelector(
    state => state.modals,
  );

  const handleCloseModal = () => {
    if (isAddModalOpen) {
      dispatch(closeAddModal());
    }
    if (isDetailModalOpen) {
      dispatch(closeDetailModal());
    }
    if (isEditModalOpen) {
      dispatch(closeEditModal());
    }
  };

  const contentClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={s.modal} onClick={handleCloseModal}>
      <div className={s.modalContent} onClick={contentClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
