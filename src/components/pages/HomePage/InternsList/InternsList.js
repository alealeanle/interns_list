import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { openDetailModal, openEditModal } from '@models/modalSlice';
import s from './InternsList.module.scss';

const InternsList = () => {
  const dispatch = useDispatch();
  const interns = useSelector(state => state.interns.interns);

  const onDetailClick = intern => {
    dispatch(openDetailModal(intern));
  };

  const onEditClick = intern => {
    dispatch(openEditModal(intern));
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
                className={clsx(s.detailBtn, 'icon-eye')}
                onClick={() => onDetailClick(intern)}
              ></button>
              <button
                className={clsx(s.detailBtn, 'icon-pencil')}
                onClick={() => onEditClick(intern)}
              ></button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InternsList;
