import PropTypes from 'prop-types';
import clsx from 'clsx';
import s from './InternDetailModal.module.scss';

const InternDetailModal = ({ selectedIntern }) => {
  return (
    <div className={s.intern}>
      <div className={s.gridContainer}>
        <div className={clsx(s.item, s.fullName)}>
          <strong className={s.label}>ФИО:</strong>
          <span className={s.text}>{selectedIntern.fullName}</span>
        </div>
        <div className={clsx(s.item, s.birthDate)}>
          <strong className={s.label}>Дата рождения:</strong>
          <span className={s.text}>{selectedIntern.birthDate}</span>
        </div>
        <div className={clsx(s.item, s.education)}>
          <strong className={s.label}>Образование:</strong>
          <span className={s.text}>{selectedIntern.education}</span>
        </div>
        <div className={clsx(s.item, s.email)}>
          <strong className={s.label}>Email:</strong>
          <span className={s.text}>{selectedIntern.email}</span>
        </div>
        <div className={clsx(s.item, s.direction)}>
          <strong className={s.label}>Направление:</strong>
          <span className={s.text}>{selectedIntern.direction}</span>
        </div>
        <div className={clsx(s.item, s.mentor)}>
          <strong className={s.label}>Ментор:</strong>
          <span className={s.text}>{selectedIntern.mentor}</span>
        </div>
        <div className={clsx(s.item, s.internshipType)}>
          <strong className={s.label}>Тип стажировки:</strong>
          <span className={s.text}>{selectedIntern.internshipType}</span>
        </div>
        <div className={clsx(s.item, s.internshipStage)}>
          <strong className={s.label}>Стадия стажировки:</strong>
          <span className={s.text}>{selectedIntern.internshipStage}</span>
        </div>
        <div className={clsx(s.item, s.startDate)}>
          <strong className={s.label}>Дата начала:</strong>
          <span className={s.text}>{selectedIntern.startDate}</span>
        </div>
        <div className={clsx(s.item, s.endDate)}>
          <strong className={s.label}>Предполагаемая дата окончания:</strong>
          <span className={s.text}>{selectedIntern.endDate}</span>
        </div>
        <div className={s.comment}>
          <strong className={s.label}>Комментарий:</strong>
          <span className={s.text}>{selectedIntern.comment}</span>
        </div>
      </div>
    </div>
  );
};

InternDetailModal.propTypes = {
  selectedIntern: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    mentor: PropTypes.string.isRequired,
    internshipType: PropTypes.string.isRequired,
    internshipStage: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    comment: PropTypes.string,
  }),
};

export default InternDetailModal;
