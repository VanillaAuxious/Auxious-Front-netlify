import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailSlides from '../components/DetailSlides';
import Accordion from '../common/Accordion';


import useAxios from '../hooks/useAxios';

import './Detail.scss';
import NavBar from '../components/NavBar';

const MOCK_DATA = {
  id: 0,
  address: '서울특별시 강남구 삼성동 240-1',
  connoisseur: '11,561,216,600원',
  lowestPrice: '3,561,243,500원',
  deposit: '10,000,000,000원',
  squareMeter: '244.628 ㎡ ( 74.00 평 )	',
  picture: [0, 1, 2, 3, 4],
};

export default function Detail() {
  const { buildingId } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const getBuildingDetail = async () => {
      const buildings = await useAxios(`buildings/${buildingId}`, 'get');
      console.log(buildings);
      setDetail(() => buildings);
    };

    getBuildingDetail();
  }, []);

  return (
    <>
      <div className='detail-container'>
        <div className='detail-img-logo'>
          <img src='/img/logo.png' alt='logo' />
        </div>
        <div className='detail-heading'>
          <div className='detail-icon'>
            <span>아이콘</span>
          </div>
          <div className='detail-auction-number'>
            <span>경매번호</span>
          </div>
        </div>
        <DetailSlides images={MOCK_DATA.picture} />
        <div className='detail-accordions'>
          <Accordion title='기본정보'>
            <ul className='detail-list detail-basics'>
              <li>
                <h5>도로명 주소</h5>
                <span>{detail.address}</span>
              </li>
              <li>
                <h5>감정평가액</h5>
                <span>{MOCK_DATA.connoisseur}</span>
              </li>
              <li>
                <h5>최저매각 가격</h5>
                <span>{MOCK_DATA.lowestPrice}</span>
              </li>
              <li>
                <h5>보증금</h5>
                <span>{MOCK_DATA.deposit}</span>
              </li>
              <li>
                <h5>면적</h5>
                <span>{MOCK_DATA.squareMeter}</span>
              </li>
            </ul>
          </Accordion>
          <Accordion title='경매 부동산 정보'>
            <ul className='detail-list'></ul>
          </Accordion>
          <Accordion title='등기현황'>
            <ul className='detail-list'></ul>
          </Accordion>
          <Accordion title='주의사항'>
            <ul className='detail-list'></ul>
          </Accordion>
          <Accordion title='감정평가서'>
            <ul className='detail-list'></ul>
          </Accordion>
        </div>
      </div>
      <NavBar />
    </>
  );
}
