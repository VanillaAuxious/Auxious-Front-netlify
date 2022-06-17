import { createPortal } from 'react-dom';

import Backdrop from './Backdrop';

import './AlertModal.scss';

export default function AlertModal({ title, content, onCancelModal }) {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onCancelModal} />,
        document.querySelector('#backdrop-root'),
      )}
      {createPortal(
        <div>
          <div>{title}</div>
          <div>{content}</div>
          <div onClick={onCancelModal}>&#10005;</div>
        </div>,
        document.querySelector('#overlay-root'),
      )}
    </>
  );
}
