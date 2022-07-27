import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import DetailSlides from './DetailSlides';
import Accordion from '../common/Accordion';
import sendAPI from '../utils/sendAPI';

import './DetailAccordion.scss';

export default function DetailArcodian() {
  const { buildingId } = useParams();
  const [detail, setDetail] = useState({ buildingInfo: {} });

  const {
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

  useLayoutEffect(() => {
    const getBuildingDetail = async () => {
      const buildings = await sendAPI(`/buildings/${buildingId}`, 'get');
      setDetail(buildings);
    };

    getBuildingDetail();
  }, []);
  return (
    <>
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
                  <li className='process' key={index}>
                    <h5>{process.dayProcess}</h5>
                    <span className='process-item'>{process.progress}</span>
                    <span className='process-item'>{process.date}</span>
                    <span className='process-item'>{process.dayProcess}</span>
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
                    <span>{tenant.tenantName}</span>
                    <span>{tenant.location}</span>
                    <span>{tenant.date}</span>
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
    </>
  );
}
