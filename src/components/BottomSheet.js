import useBottomSheet from '../hooks/useBottomSheet';
import { useState } from 'react';

import './BottomSheet.css';

function BottomSheet() {
  const { sheetArea, contentArea } = useBottomSheet();
  const [touchY, setTouchY] = useState(0);
  const test = new Array(70).fill(1);

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
      <ul
        className='bottomsheet-content'
        ref={contentArea}
        onTouchMove={handleTouchMove}>
        {test.map((e, i) => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
    </div>
  );
}

export default BottomSheet;
