import loadingImg from '../img/loading_blue_simple.gif';

function Loading() {
  return (
    <div className='loading-box'>
      <img src={loadingImg} alt='loading' />
    </div>
  );
}

export default Loading;
