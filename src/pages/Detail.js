import NavBar from '../components/NavBar';
import DetailHeader from '../components/DetailHeader';
import DetailAccordion from '../components/DetailAccordion';

import './Detail.scss';

export default function Detail() {
  return (
    <>
      <DetailHeader />
      <div className='detail-container'>
        <DetailAccordion />
      </div>
      <NavBar />
    </>
  );
}
