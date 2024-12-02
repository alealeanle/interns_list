import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@commons/Modal';
import InternDetailModal from '@pages/HomePage/InternDetailModal';
import EditInternModal from '@pages/HomePage/InternModal';
import s from './InternsList.module.scss';

const highlightMatch = (text, filter) => {
  if (!filter) return text;

  const regex = new RegExp(`(${filter})`, 'gi');
  const parts = text.split(regex);
  const lowerFilter = filter.toLowerCase();

  return parts.map(part => (
    <span
      key={uuidv4()}
      className={clsx({ [s.highlight]: part.toLowerCase() === lowerFilter })}
    >
      {part}
    </span>
  ));
};

const InternsList = ({
  isDetailModalOpen,
  isEditModalOpen,
  setIsDetailModalOpen,
  setIsEditModalOpen,
}) => {
  const interns = useSelector(state => state.interns.interns);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filterText, setFilterText] = useState(searchQuery);
  const [visibleFields, setVisibleFields] = useState({
    internshipType: true,
    internshipStage: true,
    startDate: true,
  });
  const [filteredInterns, setFilteredInterns] = useState(interns);

  const handleFilterChange = e => {
    setFilterText(e.target.value);
    setSearchParams({ search: e.target.value });
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

  useEffect(() => {
    const lowerCaseFilterText = filterText.toLowerCase();
    const filtered = interns.filter(intern => {
      return (
        intern.fullName.toLowerCase().includes(lowerCaseFilterText) ||
        intern.direction.toLowerCase().includes(lowerCaseFilterText) ||
        (visibleFields.internshipType &&
          intern.internshipType.toLowerCase().includes(lowerCaseFilterText)) ||
        (visibleFields.internshipStage &&
          intern.internshipStage.toLowerCase().includes(lowerCaseFilterText)) ||
        (visibleFields.startDate &&
          intern.startDate.toLowerCase().includes(lowerCaseFilterText))
      );
    });
    setFilteredInterns(filtered);
  }, [interns, filterText, visibleFields]);

  const onDetailClick = intern => {
    setSelectedIntern(intern);
    setIsDetailModalOpen(true);
  };

  const onEditClick = intern => {
    setSelectedIntern(intern);
    setIsEditModalOpen(true);
  };

  return (
    <ul className={s.internsList}>
      {!interns.length ? (
        <li className={s.emptyList}>Список пуст</li>
      ) : (
        <>
          <li className={s.filter}>
            <input
              type="text"
              placeholder="Поиск"
              value={filterText}
              onChange={handleFilterChange}
              className={s.filterInput}
            />
          </li>
          {!filteredInterns.length ? (
            <li className={s.emptyList}>Результаты поиска отсутствуют</li>
          ) : (
            filteredInterns.map(intern => (
              <li key={intern.id} className={s.intern}>
                <Link to={`/interns/${intern.id}`} className={s.internLink}>
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
                </Link>
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

                <Modal
                  isOpen={isDetailModalOpen}
                  setIsModalOpen={setIsDetailModalOpen}
                >
                  <InternDetailModal selectedIntern={selectedIntern} />
                </Modal>
                <Modal
                  isOpen={isEditModalOpen}
                  setIsModalOpen={setIsEditModalOpen}
                >
                  <EditInternModal
                    isEditMode
                    selectedIntern={selectedIntern}
                    setIsModalOpen={setIsEditModalOpen}
                  />
                </Modal>
              </li>
            ))
          )}
        </>
      )}
    </ul>
  );
};

InternsList.propTypes = {
  isDetailModalOpen: PropTypes.bool.isRequired,
  isEditModalOpen: PropTypes.bool.isRequired,
  setIsDetailModalOpen: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
};

export default memo(InternsList);
