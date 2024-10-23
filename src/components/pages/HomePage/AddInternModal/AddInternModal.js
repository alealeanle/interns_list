import { useState } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addIntern } from '@models/internsSlice';
import { closeAddModal } from '@models/modalSlice';
import s from './AddInternModal.module.scss';

const AddInternModal = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    fullName: '',
    birthDate: '',
    education: '',
    email: '',
    direction: 'Frontend',
    startDate: '',
    mentor: '',
    internshipType: 'Базовая',
    internshipStage: 'Изучение',
    endDate: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = 'Необходимо указать стажера';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'Введите дату в формате ДД-ММ-ГГГГ';
    }
    if (!formData.education) {
      newErrors.education = 'Необходимо указать образование';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Необходимо указать корректный email';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Введите дату в формате ДД-ММ-ГГГГ';
    }
    if (!formData.mentor) {
      newErrors.mentor = 'Необходимо указать ментора';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'Введите дату в формате ДД-ММ-ГГГГ';
    }
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      dispatch(addIntern(formData));
      dispatch(closeAddModal());
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={s.title}>Новый стажер</h2>
      <div className={s.gridContainer}>
        <div className={clsx(s.wrap, s.fullName)}>
          <label className={s.label}>ФИО</label>
          <input
            className={s.input}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className={s.error}>{errors.fullName}</p>}
        </div>
        <div className={clsx(s.wrap, s.birthDate)}>
          <label className={s.label}>Дата рождения</label>
          <input
            type="date"
            name="birthDate"
            className={clsx(s.input, {
              [s.filledDate]: Boolean(formData.birthDate),
            })}
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <p className={s.error}>{errors.birthDate}</p>}
        </div>
        <div className={clsx(s.wrap, s.education)}>
          <label className={s.label}>Образование</label>
          <input
            name="education"
            className={s.input}
            value={formData.education}
            onChange={handleChange}
          />
          {errors.education && <p className={s.error}>{errors.education}</p>}
        </div>
        <div className={clsx(s.wrap, s.email)}>
          <label className={s.label}>Email</label>
          <input
            name="email"
            className={s.input}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={s.error}>{errors.email}</p>}
        </div>
        <div className={clsx(s.wrap, s.direction)}>
          <label className={s.label}>Направление</label>
          <select
            name="direction"
            className={s.input}
            value={formData.direction}
            onChange={handleChange}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div className={clsx(s.wrap, s.internshipType)}>
          <label className={s.label}>Тип стажировки</label>
          <select
            name="internshipType"
            className={s.input}
            value={formData.internshipType}
            onChange={handleChange}
          >
            <option value="Базовая">Базовая</option>
            <option value="Менторская">Менторская</option>
          </select>
        </div>
        <div className={clsx(s.wrap, s.internshipStage)}>
          <label className={s.label}>Стадия стажировки</label>
          <select
            name="internshipStage"
            className={s.input}
            value={formData.internshipStage}
            onChange={handleChange}
          >
            {formData.internshipType === 'Базовая' ? (
              <>
                <option value="Изучение">Изучение</option>
                <option value="Первое тестовое задание">
                  Первое тестовое задание
                </option>
                <option value="Второе тестовое задание">
                  Второе тестовое задание
                </option>
              </>
            ) : (
              <>
                <option value="Изучение">Изучение</option>
                <option value="Первое практическое задание">
                  Первое практическое задание
                </option>
                <option value="Второе практическое задание">
                  Второе практическое задание
                </option>
                <option value="Третье практическое задание">
                  Третье практическое задание
                </option>
              </>
            )}
          </select>
        </div>
        <div className={clsx(s.wrap, s.startDate)}>
          <label className={s.label}>Дата начала стажировки</label>
          <input
            type="date"
            name="startDate"
            className={clsx(s.input, {
              [s.filledDate]: Boolean(formData.startDate),
            })}
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && <p className={s.error}>{errors.startDate}</p>}
        </div>
        <div className={clsx(s.wrap, s.endDate)}>
          <label className={s.label}>Предполагаемая дата окончания</label>
          <input
            type="date"
            name="endDate"
            className={clsx(s.input, {
              [s.filledDate]: Boolean(formData.endDate),
            })}
            value={formData.endDate}
            onChange={handleChange}
          />
          {errors.endDate && <p className={s.error}>{errors.endDate}</p>}
        </div>
        <div className={clsx(s.wrap, s.mentor)}>
          <label className={s.label}>Ментор</label>
          <input
            name="mentor"
            className={s.input}
            value={formData.mentor}
            onChange={handleChange}
          />
          {errors.mentor && <p className={s.error}>{errors.mentor}</p>}
        </div>
        <div className={clsx(s.wrap, s.comment)}>
          <label className={s.label}>Комментарий</label>
          <textarea
            name="comment"
            className={s.input}
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={s.submit} type="submit">
          Добавить
        </button>
      </div>
    </form>
  );
};

export default AddInternModal;
