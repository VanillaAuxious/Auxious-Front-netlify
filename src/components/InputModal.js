import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';

import useInput from '../hooks/useInput';

import './InputModal.scss';

export default function InputModal({ onCancelModal, onUpdateData }) {
  const [inputValue, onChange] = useInput('');

  const handleUpdateDescription = async (event) => {
    event.preventDefault();
    const updateData = await onUpdateData(inputValue);

    if (updateData.ok) {
      onCancelModal();
    }
  };

  return (
    <>
      {createPortal(
        <Backdrop onClick={onCancelModal} />,
        document.querySelector('#backdrop-root'),
      )}
      {createPortal(
        <form className='modal-container' onSubmit={handleUpdateDescription}>
          <h5>변경할 자기소개 정보를 입력해 주세요 (최대 20자)</h5>
          <input
            type='text'
            maxLength='20'
            value={inputValue}
            onChange={onChange}
          />
          <button>제출하기</button>
          <div onClick={onCancelModal}>&#10005;</div>
        </form>,
        document.querySelector('#overlay-root'),
      )}
    </>
  );
}
