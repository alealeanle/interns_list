import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { openAddModal } from '@models/modalSlice';
import Header from '@commons/Header';
import InternsList from './InternsList';
import Modal from '@commons/Modal';
import InternModal from './InternModal';
import InternDetailModal from './InternDetailModal';
import s from './HomePage.module.scss';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAddModalOpen, isDetailModalOpen, isEditModalOpen } = useSelector(
    state => state.modals,
  );
  const handleOpenModal = () => {
    dispatch(openAddModal());
  };

  return (
    <div
      className={clsx(s.root, {
        [s.lock]: isAddModalOpen || isDetailModalOpen || isEditModalOpen,
      })}
    >
      <Header />
      <button className={s.btn} onClick={handleOpenModal}>
        Добавить <span className={s.btnWord}>&nbsp;стажера</span>
      </button>
      <InternsList />
      {isAddModalOpen && (
        <Modal>
          <InternModal />
        </Modal>
      )}
      {isDetailModalOpen && (
        <Modal>
          <InternDetailModal />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal>
          <InternModal isEditMode />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
