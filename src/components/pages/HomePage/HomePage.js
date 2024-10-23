import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { openAddModal } from '@models/modalSlice';
import Header from '@commons/Header';
import InternsList from './InternsList';
import Modal from '@commons/Modal/Modal';
import AddInternModal from './AddInternModal';
import InternDetailModal from './InternDetailModal';
import EditInternModal from './EditInternModal/';
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
          <AddInternModal />
        </Modal>
      )}
      {isDetailModalOpen && (
        <Modal>
          <InternDetailModal />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal>
          <EditInternModal />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
