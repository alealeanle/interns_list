import { useDispatch, useSelector } from 'react-redux';
import { openAddModal } from '@models/modalSlice';
import Header from '@commons/Header';
import InternsList from './InternsList';
import Modal from '@commons/Modal';
import AddInternModal from './AddInternModal';
import InternDetailModal from './InternDetailModal';
import s from './HomePage.module.scss';
import clsx from 'clsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isAddModalOpen, isDetailModalOpen } = useSelector(
    state => state.modals,
  );
  const handleOpenModal = () => {
    dispatch(openAddModal());
  };

  return (
    <div
      className={clsx(s.root, {
        [s.lock]: isAddModalOpen || isDetailModalOpen,
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
    </div>
  );
};

export default HomePage;
