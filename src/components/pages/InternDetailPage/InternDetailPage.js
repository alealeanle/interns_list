import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InternDetailModal from '@pages/HomePage/InternDetailModal';
import s from './InternDetailPage.module.scss';

const InternDetailPage = () => {
  const { index } = useParams();
  const interns = useSelector(state => state.interns.interns);
  const selectedIntern = interns[index - 1];

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
