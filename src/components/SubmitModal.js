import { createPortal } from 'react-dom';
import Backdrop from '../common/Backdrop';

import './InputModal.scss';

export default function SubmitModal({ onCancelModal, handleSaveCanvas }) {
  return (
    <>
      {createPortal(
        <Backdrop onClick={onCancelModal} />,
        document.querySelector('#backdrop-root'),
      )}
      {createPortal(
        <form className='modal-container' onSubmit={handleSaveCanvas}>
          <h3>정말 제출하시겠습니까?</h3>
          <button>네</button>
          <button onClick={onCancelModal}>아니요</button>
          <div onClick={onCancelModal}>&#10005;</div>
        </form>,
        document.querySelector('#overlay-root'),
      )}
    </>
  );
}
