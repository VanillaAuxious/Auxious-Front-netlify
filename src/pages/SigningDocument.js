import { useRef, useEffect } from 'react';

export default function SigningDocument() {
  const ref = useRef(null);
  const image = new Image();

  image.height = '750px';
  image.width = '100%';
  image.src =
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAzMTdfOTgg%2FMDAxNjE1OTcyMzM0MDE0.P1nvKfXOCW_XKpIpVZuJ6RpICT8M2m-4-qbpMPBvhRcg.-27LrnlmDYJCEzucXFXsa3SFAT0Wse5KoxcDGRRI-3Eg.PNG.julian2020%2F%25B4%25EB%25B8%25AE%25C0%25CE_%25C0%25A7%25C0%25D3%25C0%25E5_%25283%2529.png&type=sc960_832';

  useEffect(() => {
    if (!ref) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const color = '#000000';
    ctx.drawImage(image, 0, 0, 350, 750);
    ctx.strokeRect(170, 351, 130, 130);
    const input = document.createElement('input');
    // input.createTextNode('한경훈');

    let touchesArray = [];

    const handleTouchStart = (event) => {
      event.preventDefault();
      const touches = event.changedTouches;

      for (let i = 0; i < touches.length; i++) {
        if (
          touches[i].clientX < 300 &&
          170 < touches[i].clientX &&
          touches[i].clientY < 481 &&
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
          touches[i].clientX < 300 &&
          170 < touches[i].clientX &&
          touches[i].clientY < 481 &&
          351 < touches[i].clientY
        ) {
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
  }, [ref]);

  return (
    <>
      <canvas ref={ref} width='350px' height='750px'></canvas>
    </>
  );
}
