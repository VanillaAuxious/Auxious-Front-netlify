import useBottomSheet from '../hooks/useBottomSheet';
import { useState } from 'react';

import './BottomSheet.css';

function BottomSheet(props) {
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
          {props.data.auctions.map((e, i) => {
            return <li key={i}>{i}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default BottomSheet;
