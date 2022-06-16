import SubmitModal from './SubmitModal';
import useCanvas from '../hooks/useCanvas';
import { useRef, useEffect, useState } from 'react';

export default function Canvas() {
  const ref = useRef();
  const [showModal, setShowModal] = useState(false);
  const { saveCanvasData, handleUndoCanvas, handleCitizenNumber, handleName } =
    useCanvas(ref);

  return (
    <>
      {showModal && (
        <SubmitModal
          onCancelModal={() => setShowModal(false)}
          handleSaveCanvas={saveCanvasData}
        />
      )}
      <div style={{ position: 'relative' }} width='350px' height='750px'>
        <canvas ref={ref} width='350px' height='750px'></canvas>
        <button
          style={{
            position: 'absolute',
            left: '260px',
            top: '30px',
            height: 20,
            width: 80,
            fontSize: '4px',
          }}
          onClick={handleUndoCanvas}>
          되돌리기
        </button>
        <button
          style={{
            position: 'absolute',
            left: '175px',
            top: '30px',
            height: 20,
            width: 80,
            fontSize: '4px',
          }}
          onClick={() => setShowModal(true)}>
          제출하기
        </button>
        <input
          type='text'
          style={{
            position: 'absolute',
            left: '135px',
            top: '405px',
            height: 10,
            width: 30,
            fontSize: '4px',
          }}
          onChange={handleName}></input>
        <input
          type='text'
          style={{
            position: 'absolute',
            left: '135px',
            top: '423px',
            height: 10,
            width: 30,
            fontSize: '4px',
          }}
          onChange={handleCitizenNumber}></input>
      </div>
    </>
  );
}
