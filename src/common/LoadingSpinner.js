import './LoadingSpinner.scss';

export default function Loading() {
  return (
    <div className='loading-box'>
      <img src={'/img/loading_blue_simple.gif'} alt='loading' />
    </div>
  );
}
