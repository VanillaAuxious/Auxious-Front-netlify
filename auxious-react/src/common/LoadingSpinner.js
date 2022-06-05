import React from 'react';
import loadingImg from '../img/loading_blue_simple.gif';

export function Loading() {
  return (
    <div className='loading-box'>
      <img src={loadingImg} alt='loading' />
    </div>
  );
}
