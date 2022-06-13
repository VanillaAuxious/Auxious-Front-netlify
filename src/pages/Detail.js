import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailSlides from '../components/DetailSlides';
import Accordion from '../common/Accordion';
import useAxios from '../hooks/useAxios';
import NavBar from '../components/NavBar';

import './Detail.scss';

export default function Detail() {
  const { buildingId } = useParams();
  const [detail, setDetail] = useState({ buildingInfo: {} });
  const {
    buildingType,
    auctionNumber,
    address,
    connoisseur,
    lowestPrice,
    picture,
    deposit,
    squareMeters,
    process,
    tenants,
    caution,
    appraisal,
  } = detail.buildingInfo;

  useEffect(() => {
    const getBuildingDetail = async () => {
      const buildings = await useAxios(`buildings/${buildingId}`, 'get');
      setDetail(buildings);
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
            {detail && <span>{buildingType}</span>}
          </div>
          <div className='detail-auction-number'>
            {detail && <span>{auctionNumber}</span>}
          </div>
        </div>
        {picture && <DetailSlides images={picture} />}
        <div className='detail-accordions'>
          <Accordion title='기본정보'>
            {detail && (
              <ul className='detail-list detail-basics'>
                <li>
                  <h5>도로명 주소</h5>
                  <span>{address}</span>
                </li>
                <li>
                  <h5>감정평가액</h5>
                  <span>{connoisseur}</span>
                </li>
                <li>
                  <h5>최저매각 가격</h5>
                  <span>{lowestPrice}</span>
                </li>
                <li>
                  <h5>보증금</h5>
                  <span>{deposit}</span>
                </li>
                <li>
                  <h5>면적</h5>
                  <span>{squareMeters} ㎡</span>
                </li>
              </ul>
            )}
          </Accordion>
          <Accordion title='경매 부동산 정보'>
            <ul className='detail-list'>
              {process &&
                process.map((process, index) => {
                  return (
                    <li key={index}>
                      <div>{process.dayProcess}</div>
                      <div>{process.progress}</div>
                      <div>{process.date}</div>
                      <div>{process.dayProcess}</div>
                    </li>
                  );
                })}
            </ul>
          </Accordion>
          <Accordion title='등기현황'>
            <ul className='detail-list'>
              {tenants &&
                tenants.map((tenant, index) => {
                  return (
                    <li key={index}>
                      <div>{tenant.tenantName}</div>
                      <div>{tenant.location}</div>
                      <div>{tenant.date}</div>
                    </li>
                  );
                })}
            </ul>
          </Accordion>
          <Accordion title='주의사항'>
            {process && <div className='detail-list'>{caution}</div>}
          </Accordion>
          <Accordion title='감정평가서'>
            {process && <div className='detail-list'>{appraisal}</div>}
          </Accordion>
        </div>
      </div>
      <NavBar />
    </>
  );
}
