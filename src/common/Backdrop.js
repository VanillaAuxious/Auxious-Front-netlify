import './Backdrop.scss';

export default function Backdrop({ onClick }) {
  return <div className='backdrop' onClick={onClick}></div>;
}
