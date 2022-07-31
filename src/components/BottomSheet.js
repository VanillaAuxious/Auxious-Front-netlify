import useBottomSheet from '../hooks/useBottomSheet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './BottomSheet.scss';

function BottomSheet(props) {
  const navigate = useNavigate();
  const { sheetArea, contentArea } = useBottomSheet();
  const [touchY, setTouchY] = useState(0);

  const handleTouchMove = (event) => {
    for (let i = 0; i < event.touches.length; i++) {
      if (event.touches[i].clientY > touchY) {
        contentArea.current.scrollTop -= 20;
      } else if (event.touches[i].clientY < touchY) {
        contentArea.current.scrollTop += 20;
      }

      setTouchY(event.touches[i].clientY);
    }
  };

  const handleNavigateToDetail = (event) => {
    const target = event.target.closest('.building-container');
    const uri = '/detail/' + target.id;

    navigate(uri);
  };

  return (
    <div className='bottomSheet' ref={sheetArea}>
      <div className='bottomSheet-header'>
        <div className='handle' />
      </div>
      <h3 className='hading'>지역 경매 매물</h3>
      {props.data && (
        <ul
          className='bottomSheet-content'
          ref={contentArea}
          onTouchMove={handleTouchMove}>
          {props.data.auctions.map((building, index) => {
            return (
              <div
                key={index}
                className='building-container'
                id={building._id}
                onClick={handleNavigateToDetail}>
                <img src={building.picture} height='50px' width='45px'></img>
                <div className='building-info'>
                  <div>주소:{building.address}</div>
                  <div>감정가:{building.connoisseur}</div>
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BottomSheet;
