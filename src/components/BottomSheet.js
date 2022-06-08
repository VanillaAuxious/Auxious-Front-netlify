import useBottomSheet from '../hooks/useBottomSheet';

import './BottomSheet.css';

function BottomSheet() {
  const { sheetArea, contentArea } = useBottomSheet();
  const test = new Array(70).fill(1);

  return (
    <div className='bottomsheet' ref={sheetArea}>
      <div className='bottomsheet-header'>
        <div className='handle' />
      </div>
      <ul className='bottomsheet-content' ref={contentArea}>
        {test.map((e, i) => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
    </div>
  );
}

export default BottomSheet;
