import NavBar from '../components/NavBar';
import DetailHeader from '../components/DetailHeader';
import DetailArcodian from '../components/DetailArcodian';

import './Detail.scss';

export default function Detail() {
  return (
    <>
      <DetailHeader />
      <div className='detail-container'>
        <DetailArcodian />
      </div>
      <NavBar />
    </>
  );
}
