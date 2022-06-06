import './BottomSheet.css';

const MIN_BACKGROUND_Y = 60;
const MAX_BACKGROUND_Y = window.innerHeight - 80;
const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_BACKGROUND_Y;

function BottomSheet() {
  document.documentElement.style.setProperty(
    'bottomsheet-height',
    BOTTOM_SHEET_HEIGHT,
  );

  const handleTouchStart = (event) => {
    console.log(event.touches[0].pageX);
  };

  const handleTouchMove = (event) => {
    console.log(event.touches[0]);
  };

  const handleTouchEnd = (event) => {
    console.log(event.touches[0]);
  };

  return (
    <div className='bottomsheet-container'>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className='bottomsheet-header'>
        <div className='handle'></div>
      </div>
      <div className='bottomsheet-content'></div>
    </div>
  );
}

export default BottomSheet;
