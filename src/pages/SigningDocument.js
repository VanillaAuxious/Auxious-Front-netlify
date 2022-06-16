import { useRef, useEffect, useState } from 'react';

import { jsPDF } from 'jspdf';
import SubmitModal from '../components/SubmitModal';

export default function SigningDocument() {
  const ref = useRef();
  const image = new Image();
  image.height = '750px';
  image.width = '100%';
  image.src = 'img/doc.png';
  const [citizenNumber, setCitizenNumber] = useState(0);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  console.log(image);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 350, 750);
    ctx.strokeRect(174, 351, 120, 120);
    const color = '#000000';

    let touchesArray = [];

    ctx.fillText('한경훈', 140, 199, 30);
    ctx.fillText('960105', 140, 218, 30);
    ctx.fillText(year, 110, 582, 30);
    ctx.fillText(month, 160, 582, 30);
    ctx.fillText(day, 187, 582, 30);

    const handleTouchStart = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (
          touches[i].clientX < 294 &&
          174 < touches[i].clientX &&
          touches[i].clientY < 471 &&
          351 < touches[i].clientY
        ) {
          touchesArray.push(touches[i]);
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (
          touches[i].clientX < 294 &&
          174 < touches[i].clientX &&
          touches[i].clientY < 471 &&
          351 < touches[i].clientY
        ) {
          const index = ongoingTouchIndexById(touches[i].identifier);

          if (index >= 0) {
            ctx.beginPath();
            ctx.moveTo(touchesArray[index].pageX, touchesArray[index].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            ctx.stroke();

            touchesArray.splice(index, 1, touches[i]);
          }
        }
      }
    };

    const handleTouchEnd = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let index = ongoingTouchIndexById(touches[i].identifier);

        if (index >= 0) {
          ctx.lineWidth = 2;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(touchesArray[index].pageX, touchesArray[index].pageY);
          ctx.lineTo(touches[i].pageX, touches[i].pageY);

          touchesArray.splice(index, 1);
        }
      }
    };

    const handleTouchCancel = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let index = ongoingTouchIndexById(touches[i].identifier);

        touchesArray.splice(index, 1);
      }
    };

    function ongoingTouchIndexById(_id) {
      for (let i = 0; i < touchesArray.length; i++) {
        if (touchesArray[i].identifier == _id) {
          return i;
        }
      }
      return;
    }

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchcancel', handleTouchCancel);
  }, [ref.current]);

  const handleCitizenNumber = (event) => {
    setCitizenNumber(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleUndoCanvas = (event) => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(174, 351, 120, 120);
  };

  const saveCanvasData = () => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.fillText(name, 135, 415, 30);
    ctx.fillText(citizenNumber, 135, 433, 30);

    const canvasData = canvas.toDataURL('image/jpeg', 1.0);

    const doc = new jsPDF('landscape');
    doc.addImage(canvasData, 'JPEG', 0, 0, 200, 200);
    const pdfURI = doc.output('datauristring');
    doc.save('contract.pdf');
  };

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
          onClick={saveCanvasData}>
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
