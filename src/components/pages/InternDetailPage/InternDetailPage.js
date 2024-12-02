import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InternDetailModal from '@pages/HomePage/InternDetailModal';
import s from './InternDetailPage.module.scss';

const InternDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedIntern = useSelector(state => state.interns.selectedIntern);

  useEffect(() => {
    dispatch({ type: 'interns/fetchInternById', payload: id });
  }, [id, dispatch]);

  if (!selectedIntern) {
    return <p className={s.title}>Стажёр не найден</p>;
  }

  return (
    <div className={s.root}>
      <h1 className={s.title}>Детали стажера</h1>
      <InternDetailModal selectedIntern={selectedIntern} />
    </div>
  );
};

export default InternDetailPage;
