import { useRef, useEffect } from 'react';
import {
  MIN_BACKGROUND_Y,
  MAX_BACKGROUND_Y,
  BOTTOM_SHEET_HEIGHT,
} from '../utils/constants';

function useBottomSheet() {
  const sheetArea = useRef(null);
  const contentArea = useRef(null);
  const metrics = useRef({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: null,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    sheetArea.current.style.height = `${BOTTOM_SHEET_HEIGHT}px`;

    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (!isContentAreaTouched) {
        return true;
      }

      if (sheetArea.current.getBoundingClientRect().y !== MIN_BACKGROUND_Y) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        return contentArea.current.scrollY <= 0;
      }

      return false;
    };

    const handleTouchStart = (event) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheetArea.current.getBoundingClientRect().y;
      touchStart.touchY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();

      const target = event.target.closest('ul');
      if (target) return;

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = event.touches[0];

      if (touchMove.prevTouchY === null) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_BACKGROUND_Y) {
          nextSheetY = MIN_BACKGROUND_Y;
        }

        if (nextSheetY >= MAX_BACKGROUND_Y) {
          nextSheetY = MAX_BACKGROUND_Y;
        }

        sheetArea.current.style.transform = `translateY(${
          nextSheetY - MAX_BACKGROUND_Y
        }px)`;
      }
    };

    const handleTouchEnd = () => {
      const { touchMove } = metrics.current;

      const currentSheetY = sheetArea.current.getBoundingClientRect().y;

      if (currentSheetY !== MIN_BACKGROUND_Y) {
        if (touchMove.movingDirection === 'down') {
          sheetArea.current.style.transform = 'translateY(0)';
        }

        if (touchMove.movingDirection === 'up') {
          sheetArea.current.style.transform = `translateY(${
            MIN_BACKGROUND_Y - innerHeight
          }px)`;
        }
      }

      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: null,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    sheetArea.current.addEventListener('touchstart', handleTouchStart);
    sheetArea.current.addEventListener('touchmove', handleTouchMove);
    sheetArea.current.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheetArea.current.removeEventListener('touchstart', handleTouchStart);
      sheetArea.current.removeEventListener('touchmove', handleTouchMove);
      sheetArea.current.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = (event) => {
      event.preventDefault();
      metrics.current.isContentAreaTouched = true;
    };

    contentArea.current.addEventListener('touchstart', handleTouchStart);

    return () => {
      contentArea.current.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return {
    sheetArea,
    contentArea,
  };
}

export default useBottomSheet;
