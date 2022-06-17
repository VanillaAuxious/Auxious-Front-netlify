import useBottomSheet from '../hooks/useBottomSheet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './BottomSheet.css';

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
    const uri = event.target.id;
    navigate('/buildings/' + uri);
  };

  return (
    <div className='bottomsheet' ref={sheetArea}>
      <div className='bottomsheet-header'>
        <div className='handle' />
      </div>

      <div>이 지역 경매 매물</div>
      {props.data && (
        <ul
          className='bottomsheet-content'
          ref={contentArea}
          onTouchMove={handleTouchMove}>
          {props.data.auctions.map((building, index) => {
            return (
              <div
                key={index}
                className='building-container'
                id={building._id}
                onClick={handleNavigateToDetail}>
                <img src={building.picture} height='50px' width='30px'></img>
                <div>
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
