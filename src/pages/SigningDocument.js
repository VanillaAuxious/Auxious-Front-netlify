import { useRef, useLayoutEffect } from 'react';

export default function SigningDocument() {
  const ref = useRef();

  useLayoutEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const color = '#000000';

    let touchesArray = [];

    const handleTouchStart = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        touchesArray.push(touches[i]);

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        const index = ongoingTouchIndexById(touches[i].identifier);

        if (index >= 0) {
          ctx.beginPath();
          ctx.moveTo(touchesArray[index].pageX, touchesArray[index].pageY);
          ctx.lineTo(touches[i].pageX, touches[i].pageY);
          ctx.lineWidth = 4;
          ctx.strokeStyle = color;
          ctx.stroke();

          touchesArray.splice(index, 1, touches[i]);
        }
      }
    };

    const handleTouchEnd = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        let index = ongoingTouchIndexById(touches[i].identifier);

        if (index >= 0) {
          ctx.lineWidth = 4;
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

  return (
    <>
      <canvas ref={ref} width='300' height='300'></canvas>
    </>
  );
}
