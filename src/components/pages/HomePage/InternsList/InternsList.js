import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openDetailModal } from '@models/modalSlice';
import s from './InternsList.module.scss';

const InternsList = () => {
  const dispatch = useDispatch();
  const interns = useSelector(state => state.interns.interns);
  const [filterText, setFilterText] = useState('');
  const [visibleFields, setVisibleFields] = useState({
    internshipType: true,
    internshipStage: true,
    startDate: true,
  });

  const handleFilterChange = e => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setVisibleFields({
        internshipType: width > 768,
        internshipStage: width > 992,
        startDate: width > 1024,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredInterns = interns.filter(intern => {
    return (
      intern.fullName.toLowerCase().includes(filterText.toLowerCase()) ||
      intern.direction.toLowerCase().includes(filterText.toLowerCase()) ||
      (visibleFields.internshipType &&
        intern.internshipType
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (visibleFields.internshipStage &&
        intern.internshipStage
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (visibleFields.startDate &&
        intern.startDate.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    const parts = text.split(regex);

    return parts.map(part =>
      part.toLowerCase() === filter.toLowerCase() ? (
        <span key={uuidv4()} className={s.highlight}>
          {part}
        </span>
      ) : (
        <React.Fragment key={uuidv4()}>{part}</React.Fragment>
      ),
    );
  };

  const onDetailClick = intern => {
    dispatch(openDetailModal(intern));
  };

  return (
    <div className={s.internsList}>
      {!interns.length ? (
        <p className={s.emptyList}>Список пуст</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Поиск"
            value={filterText}
            onChange={handleFilterChange}
            className={s.filterInput}
          />
          {!filteredInterns.length ? (
            <p className={s.emptyList}>Результаты поиска отсутствуют</p>
          ) : (
            filteredInterns.map(intern => (
              <div key={intern.id} className={s.intern}>
                <p className={s.internItem}>
                  <strong className={clsx(s.label, s.fullNameLabel)}>
                    ФИО:
                  </strong>
                  <span>{highlightMatch(intern.fullName, filterText)}</span>
                </p>
                <p className={s.internItem}>
                  <strong className={clsx(s.label, s.directionLabel)}>
                    Направление:
                  </strong>
                  <span>{highlightMatch(intern.direction, filterText)}</span>
                </p>
                <p className={clsx(s.internItem, s.internshipType)}>
                  <strong className={s.label}>Тип стажировки:</strong>
                  <span>
                    {highlightMatch(intern.internshipType, filterText)}
                  </span>
                </p>
                <p className={clsx(s.internItem, s.internshipStage)}>
                  <strong className={s.label}>Стадия стажировки:</strong>
                  <span>
                    {highlightMatch(intern.internshipStage, filterText)}
                  </span>
                </p>
                <p className={clsx(s.internItem, s.startDate)}>
                  <strong className={s.label}>Дата начала:</strong>
                  <span>{highlightMatch(intern.startDate, filterText)}</span>
                </p>
                <div className={s.buttons}>
                  <button
                    className={clsx(s.btn, 'icon-eye')}
                    onClick={() => onDetailClick(intern)}
                  ></button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default InternsList;
