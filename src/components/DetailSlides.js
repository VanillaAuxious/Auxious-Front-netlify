import { useState, useRef } from 'react';

import './DetailSlides.scss';

export default function DetailSlides({ images }) {
  const [slideNumber, setSlideNumber] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const rightButton = useRef();
  const leftButton = useRef();

  const handleSlideMove = (num) => {
    const isLeftEnd = !slideNumber && num < 0;
    const isRightEnd = slideNumber === images.length - 1 && num > 0;

    if (isLeftEnd || isRightEnd) return;

    setSlideNumber((prevState) => prevState + num);
  };

  const handleSlideMoveByDot = (index) => {
    setSlideNumber(index);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX - event.changedTouches[0].clientX > 30) {
      handleSlideMove(1);
    } else if (event.changedTouches[0].clientX - touchStartX > 30) {
      handleSlideMove(-1);
    }
  };

  return (
    <div className='detail-slides-container'>
      <button
        className='detail-slide-btn prev'
        onClick={handleSlideMove.bind(null, -1)}
        ref={leftButton}>
        <p>&lt;</p>
      </button>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className='detail-slides'
        style={{
          transform: `translateX(-${slideNumber * 100}vw)`,
        }}>
        {images.map((src, index) => {
          return (
            <div key={index} className='detail-slide'>
              <div className='slide-img-area'>
                <img src={src} alt='logo' />
              </div>
              <div className='dots'>
                {images.map((src, index) => (
                  <div
                    key={index}
                    className='dot'
                    style={{
                      backgroundColor:
                        index === slideNumber ? 'black' : 'transparent',
                    }}
                    onClick={handleSlideMoveByDot.bind(null, index)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className='detail-slide-btn next'
        onClick={handleSlideMove.bind(null, 1)}
        ref={rightButton}>
        <p>&gt;</p>
      </button>
    </div>
  );
}
