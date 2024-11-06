import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Modal from '@commons/Modal/Modal';
import InternDetailModal from '@pages/HomePage/InternDetailModal';
import EditInternModal from '@pages/HomePage/InternModal';
import s from './InternsList.module.scss';

const InternsList = ({
  isDetailModalOpen,
  isEditModalOpen,
  setIsDetailModalOpen,
  setIsEditModalOpen,
}) => {
  const interns = useSelector(state => state.interns.interns);
  const [selectedIntern, setSelectedIntern] = useState(null);

  const onDetailClick = intern => {
    setSelectedIntern(intern);
    setIsDetailModalOpen(true);
  };

  const onEditClick = intern => {
    setSelectedIntern(intern);
    setIsEditModalOpen(true);
  };

  return (
    <div className={s.internsList}>
      {!interns.length ? (
        <p className={s.emptyList}>Список пуст</p>
      ) : (
        interns.map(intern => (
          <div key={intern.id} className={s.intern}>
            <p className={s.internItem}>
              <strong className={clsx(s.label, s.fullNameLabel)}>ФИО:</strong>
              <span>{intern.fullName}</span>
            </p>
            <p className={s.internItem}>
              <strong className={clsx(s.label, s.directionLabel)}>
                Направление:
              </strong>
              <span>{intern.direction}</span>
            </p>
            <p className={clsx(s.internItem, s.internshipType)}>
              <strong className={s.label}>Тип стажировки:</strong>
              <span>{intern.internshipType}</span>
            </p>
            <p className={clsx(s.internItem, s.internshipStage)}>
              <strong className={s.label}>Стадия стажировки:</strong>
              <span>{intern.internshipStage}</span>
            </p>
            <p className={clsx(s.internItem, s.startDate)}>
              <strong className={s.label}>Дата начала:</strong>
              <span>{intern.startDate}</span>
            </p>
            <div className={s.buttons}>
              <button
                className={clsx(s.btn, 'icon-eye')}
                onClick={() => onDetailClick(intern)}
              ></button>
              <button
                className={clsx(s.btn, 'icon-pencil')}
                onClick={() => onEditClick(intern)}
              ></button>
            </div>

            <Modal isOpen={isDetailModalOpen} closeModal={setIsDetailModalOpen}>
              <InternDetailModal selectedIntern={selectedIntern} />
            </Modal>
            <Modal isOpen={isEditModalOpen} closeModal={setIsEditModalOpen}>
              <EditInternModal
                isEditMode
                selectedIntern={selectedIntern}
                closeModal={setIsEditModalOpen}
              />
            </Modal>
          </div>
        ))
      )}
    </div>
  );
};

InternsList.propTypes = {
  isDetailModalOpen: PropTypes.bool.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,
  setIsDetailModalOpen: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
};

export default memo(InternsList);
