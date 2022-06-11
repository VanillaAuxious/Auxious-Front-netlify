import { useState } from 'react';

import './DetailSlides.scss';

export default function DetailSlides({ images }) {
  const [slideNumber, setSlideNumber] = useState(0);

  const handleSlideMove = (num) => {
    const isLeftEnd = !slideNumber && num < 0;
    const isRightEnd = slideNumber === images.length - 1 && num > 0;

    if (isLeftEnd || isRightEnd) return;

    setSlideNumber((prevState) => prevState + num);
  };

  const handleSlideMoveByDot = (index) => {
    setSlideNumber(index);
  };

  return (
    <div className='detail-slides-container'>
      <button
        className='detail-slide-btn prev'
        onClick={handleSlideMove.bind(null, -1)}>
        <p>&lt;</p>
      </button>
      <div
        className='detail-slides'
        style={{
          transform: `translateX(-${slideNumber * 100}vw)`,
        }}>
        {images.map((src, index) => {
          return (
            <div key={index} className='detail-slide'>
              <div className='slide-img-area'>
                {index}
                <img src='/img/logo.png' alt='logo' />
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
        onClick={handleSlideMove.bind(null, 1)}>
        <p>&gt;</p>
      </button>
    </div>
  );
}
