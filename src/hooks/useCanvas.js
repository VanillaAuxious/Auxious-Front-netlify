import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { useNavigate, useParams } from 'react-router-dom';

import useAxios from '../hooks/useAxios';

export default function useCanvas(ref) {
  const [citizenNumber, setCitizenNumber] = useState(0);
  const [name, setName] = useState('');
  const { agent } = useParams();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const navigate = useNavigate();

  useEffect(() => {
    const image = new Image();
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const color = '#000000';
    let touchesArray = [];
    image.height = '750px';
    image.width = '100%';
    image.src = '/img/doc.png';

    image.onload = () => {
      ctx.drawImage(image, 0, 0, 350, 750);
      ctx.strokeRect(174, 351, 120, 120);

      ctx.fillText(agent, 140, 199, 30);
      ctx.fillText('960105', 140, 218, 30);
      ctx.fillText(year, 110, 582, 30);
      ctx.fillText(month, 160, 582, 30);
      ctx.fillText(day, 187, 582, 30);
      ctx.fillText(agent + '에게 경매 권한을 위임합니다.', 100, 298, 150);
    };

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
  }, []);

  const saveCanvasData = async () => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    ctx.fillText(name, 135, 415, 30);
    ctx.fillText(citizenNumber, 135, 433, 30);

    const canvasData = canvas.toDataURL('image/jpeg');

    const doc = new jsPDF('landscape');
    doc.addImage(canvasData, 'JPEG', 0, 0, 200, 200);
    const pdfURI = doc.output('datauristring');
    doc.save('contract.pdf');

    await useAxios('/users/user/contract', 'post', {
      contract: pdfURI,
    });

    navigate('/');
  };

  const handleUndoCanvas = () => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(174, 351, 120, 120);
  };

  const handleCitizenNumber = (event) => {
    setCitizenNumber(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  return { saveCanvasData, handleUndoCanvas, handleCitizenNumber, handleName };
}
