import { useState } from 'react';
import clsx from 'clsx';
import Modal from '@commons/Modal';
import Header from '@commons/Header';
import InternsList from './InternsList';
import AddInternModal from './InternModal';
import s from './HomePage.module.scss';

const HomePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
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

      <InternsList
        isDetailModalOpen={isDetailModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <Modal isOpen={isAddModalOpen} closeModal={setIsAddModalOpen}>
        <AddInternModal closeModal={setIsAddModalOpen} />
      </Modal>
    </div>
  );
};

export default HomePage;
